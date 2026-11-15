#!/usr/bin/env python3
"""Build the papermorph image and redeploy it through Portainer.

Run from the repository root:

    python3 ci/deploy.py            # build, push to the local registry, redeploy
    python3 ci/deploy.py --no-push  # build and redeploy from the local daemon only

The image is pushed to a throwaway registry:2 bound to the tailscale IP, reached
over a localhost TLS-terminating proxy (Docker refuses plain HTTP for
non-localhost registries and the daemon config needs root). The registry and
proxy are started and removed by this script, so nothing is left listening.

Needs docker, python3, and PORTAINER_TOKEN (or PORTAINER_TOKEN_FILE).
"""
import json
import os
import signal
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMAGE = "spr421-papermorph:latest"
REGISTRY_IMAGE = "registry:2"
REGISTRY_NAME = "registry"
REGISTRY_IP = os.environ["REGISTRY_IP"]
REGISTRY_PORT = int(os.environ.get("REGISTRY_PORT", "5000"))
PROXY_PORT = int(os.environ.get("PROXY_PORT", "5443"))
PROXY_SRC = Path(os.environ.get("TLS_PROXY_SRC", str(Path(__file__).resolve().parent / "tls_proxy.py")))
CERT_DIR = Path(os.environ["TLS_CERT_DIR"])
PORTAINER = os.environ["PORTAINER_URL"]
STACK = int(os.environ.get("PORTAINER_STACK", "15"))
ENDPOINT = int(os.environ.get("PORTAINER_ENDPOINT", "6"))
TOKEN_FILE = Path(os.environ.get("PORTAINER_TOKEN_FILE", ""))
PORTAINER_TOKEN = os.environ.get("PORTAINER_TOKEN", "")


def sh(label, cmd, **kw):
    print(f"\n$ {label}", flush=True)
    r = subprocess.run(cmd, cwd=ROOT, **kw)
    if r.returncode:
        sys.exit(f"FAILED: {label} (exit {r.returncode})")
    return r


def tailscale_ip():
    """This host's tailscale IPv4, so the registry binds to it rather than 0.0.0.0."""
    try:
        out = subprocess.run(["tailscale", "ip", "-4"], capture_output=True, text=True, timeout=15)
        ip = out.stdout.strip().splitlines()[0]
        if ip:
            return ip
    except Exception:
        pass
    return REGISTRY_IP


def build_image():
    sh("docker build", ["docker", "build", "-t", IMAGE, "."])


def start_registry():
    ip = tailscale_ip()
    print(f"registry will bind {ip}:{REGISTRY_PORT}")
    subprocess.run(["docker", "rm", "-f", REGISTRY_NAME], capture_output=True)
    r = subprocess.run(
        ["docker", "run", "-d", "--name", REGISTRY_NAME,
         "-p", f"{ip}:{REGISTRY_PORT}:{REGISTRY_PORT}", REGISTRY_IMAGE],
        capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"FAILED: start registry: {r.stderr.strip()}")
    for _ in range(30):
        time.sleep(1)
        c = subprocess.run(["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
                            f"http://{ip}:{REGISTRY_PORT}/v2/"],
                           capture_output=True, text=True)
        if c.stdout.strip() == "200":
            return ip
    sys.exit("FAILED: registry did not become healthy")


def start_proxy(ip):
    if not PROXY_SRC.exists():
        sys.exit(f"FAILED: TLS proxy missing at {PROXY_SRC}")
    env = dict(os.environ)
    env["REGISTRY_UPSTREAM"] = f"http://{ip}:{REGISTRY_PORT}"
    env["PROXY_PORT"] = str(PROXY_PORT)
    env["TLS_CERT"] = str(CERT_DIR / "cert.pem")
    env["TLS_KEY"] = str(CERT_DIR / "key.pem")
    p = subprocess.Popen([sys.executable, str(PROXY_SRC)], env=env,
                         stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(20):
        time.sleep(0.5)
        c = subprocess.run(["curl", "-sk", "-o", "/dev/null", "-w", "%{http_code}",
                            f"https://127.0.0.1:{PROXY_PORT}/v2/"],
                           capture_output=True, text=True)
        if c.stdout.strip() == "200":
            return p
    p.kill()
    sys.exit("FAILED: TLS proxy did not become healthy")


def push_image():
    ref = f"localhost:{PROXY_PORT}/{IMAGE}"
    sh("docker tag", ["docker", "tag", IMAGE, ref])
    sh("docker push", ["docker", "push", ref])


def stop_transport(proxy):
    if proxy:
        proxy.send_signal(signal.SIGTERM)
        try:
            proxy.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proxy.kill()
    subprocess.run(["docker", "rm", "-f", REGISTRY_NAME], capture_output=True)
    print("\nregistry and TLS proxy removed")


def redeploy():
    tok = PORTAINER_TOKEN
    if not tok:
        if not TOKEN_FILE:
            sys.exit("FAILED: set PORTAINER_TOKEN or PORTAINER_TOKEN_FILE")
        tok = TOKEN_FILE.read_text().strip()

    def req(method, path, payload=None) -> tuple[int, dict]:
        data = json.dumps(payload).encode() if payload is not None else None
        r = urllib.request.Request(PORTAINER + path, data=data, method=method,
                                   headers={"X-API-Key": tok, "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(r, timeout=90) as resp:
                return resp.status, json.loads(resp.read().decode() or "{}")
        except urllib.error.HTTPError as e:
            return e.code, {"error": e.read().decode()[:500]}

    _, stack = req("GET", f"/api/stacks/{STACK}/file")
    content = stack["StackFileContent"]
    status, body = req("PUT", f"/api/stacks/{STACK}?endpointId={ENDPOINT}",
                       {"StackFileContent": content, "PullImage": False, "Prune": False})
    if status != 200:
        sys.exit(f"FAILED: Portainer PUT {status}: {body.get('error', body)}")
    print(f"Portainer PUT: {status}")

    for _ in range(40):
        time.sleep(3)
        _, s = req("GET", f"/api/stacks/{STACK}")
        st = s.get("Status")
        if st in (1, 2, 4):
            if st == 4:
                msg = s.get("DeploymentStatus", [{}])[-1].get("Message")
                sys.exit(f"FAILED: stack status 4: {msg}")
            print(f"stack status: {st}")
            break

    _, cs = req("GET", f"/api/endpoints/{ENDPOINT}/docker/containers/json?all=1")
    for c in cs:
        if "papermorph" in str(c.get("Names")):
            print(f"container: {c['Names']} {c['State']} ImageID: {c['ImageID'][:19]}")


def main():
    push = "--no-push" not in sys.argv
    build_image()
    proxy = None
    try:
        if push:
            ip = start_registry()
            proxy = start_proxy(ip)
            push_image()
    finally:
        if push:
            stop_transport(proxy)
    redeploy()
    print("\ndeploy complete")


if __name__ == "__main__":
    main()
