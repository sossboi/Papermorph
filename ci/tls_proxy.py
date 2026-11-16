#!/usr/bin/env python3
"""TLS-terminating reverse proxy for the plain-HTTP registry.

Docker refuses to talk plain HTTP to a non-localhost registry, and the daemon
config (insecure-registries) needs root. So: terminate TLS here on 127.0.0.1
and forward to the registry over tailscale. Docker sees https://localhost,
which it already trusts as insecure-allowed.
"""
import http.server
import os
import socketserver
import ssl
import urllib.request
import urllib.error

LISTEN_HOST = os.environ.get("LISTEN_HOST", "127.0.0.1")
LISTEN = (LISTEN_HOST, int(os.environ.get("PROXY_PORT", "5443")))
UPSTREAM = os.environ["REGISTRY_UPSTREAM"]
CERT = os.environ["TLS_CERT"]
KEY = os.environ["TLS_KEY"]


class Handler(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def _proxy(self):
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else None
        url = UPSTREAM + self.path
        req = urllib.request.Request(url, data=body, method=self.command)
        for h in ("Content-Type", "Accept", "Authorization", "Docker-Distribution-Api-Version"):
            if self.headers.get(h):
                req.add_header(h, self.headers[h])
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = resp.read()
                self.send_response(resp.status)
                for k, v in resp.headers.items():
                    if k.lower() in ("transfer-encoding", "connection", "content-length"):
                        continue
                    self.send_header(k, v)
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as e:
            data = e.read()
            self.send_response(e.code)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            msg = str(e).encode()
            self.send_response(502)
            self.send_header("Content-Length", str(len(msg)))
            self.end_headers()
            self.wfile.write(msg)

    do_GET = _proxy
    do_HEAD = _proxy
    do_POST = _proxy
    do_PUT = _proxy
    do_PATCH = _proxy
    do_DELETE = _proxy

    def log_message(self, fmt, *args):
        pass


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(CERT, KEY)
httpd = Server(LISTEN, Handler)
httpd.socket = ctx.wrap_socket(httpd.socket, server_side=True)
print(f"TLS proxy on https://{LISTEN[0]}:{LISTEN[1]} -> {UPSTREAM}", flush=True)
httpd.serve_forever()