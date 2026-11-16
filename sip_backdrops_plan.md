# SIP Books — Courtroom‑Aesthetic Wood Accents Backdrop Plan

Generated: Sun Nov 15 09:01:45 PM SAST 2026


## Prompts (copy‑paste into Hugging Face / Microsoft Designer / Stable Diffusion)

### sip14-defective-processes
```
photo of a law‑office desk with a stack of file folders, a magnifying glass over a “defective clause” stamp, soft natural light, shallow depth of field
```

### sip15-settlement-offers
```
image of a negotiation table with two laptops, a handwritten “settlement offer” note, a potted plant, daylight from a window
```

### sip16-plea-counterclaim
```
courthouse corridor with a “Plea” sign on a door, dim overhead lights, a single chair, muted grey‑blue tones
```

### sip17-amendment-pleadings
```
studio shot of a parchment scroll with a quill pen, wax seal, and a stack of modern case files; warm lamplight
```

### sip18-preparation-trial
```
courtroom interior from the jury’s perspective, rows of seats, a faint gavel icon projected on the wall, daylight from high windows
```

### sip19-trial-judgment
```
illustrated courtroom after the trial: judge’s bench empty, a written “judgment” on a podium, soft sunset light through blinds
```

### sip20-provisional-sentence
```
photo of a prison cell doorway with a “Provisional Sentence” banner, barred window, steel‑grey tones
```

### sip21-appeals-reviews
```
library reading room with rows of law reports, a single hanging lamp, a “Appeals” badge on a shelf
```

### sip22-execution
```
exterior of a high‑security prison at dusk, floodlights, a “Execution” sign on a gate, dark sky
```

### sip23-legal-costs
```
close‑up of a billing invoice on a wooden desk, a calculator, a gavel lying beside, warm lamplight
```

### sip24-legal-costs
```
infographic‑style illustration of a balance scale with a gavel, subtle wood grain background, monochrome palette
```


## Image placement

- `site/assets/images/sip14-defective-processes.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip15-settlement-offers.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip16-plea-counterclaim.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip17-amendment-pleadings.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip18-preparation-trial.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip19-trial-judgment.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip20-provisional-sentence.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip21-appeals-reviews.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip22-execution.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip23-debt-collection.jpg` — host your generated/image‑here file here.

- `site/assets/images/sip24-legal-costs.jpg` — host your generated/image‑here file here.


## Backdrop injection template (insert at top of each beat builder)

```js
backdrop(0.3, (g) => {
  const img = document.createElement('img')
  img.src = '/site/assets/images/sip14-defective-processes.jpg'  <!-- change per book -->
  img.style.position = 'absolute'
  img.style.top = img.style.left = 0
  img.style.width = img.style.height = '100%'
  img.style.objectFit = 'cover'
  img.style.filter = 'brightness(0.6)'   // scrim so white/light text stays legible
  g.append(img)
})
```

_Replace the `img.src` path with the correct slug for each beat. The same pattern repeats in every chapter's beat builder._


## Mark alignment verification (after any narration edit)

```bash
# Per book, per chapter
python3 <papermorph>/scripts/zonos3_engine.py \
  content/<book>/chNN/narration.en.json \
  site/<book>/chNN/audio/en
```

```js
// Browser console, for each beat:
len(set(marks.values)) === len(marks)   // should be true
```


## End‑to‑end verification (per skill checklist)

- `node --check` on every chapter's inline `<script>` (no `src`).
- `.seg` count = beat count, `CHAPTER` defined.
- Stage draws; rows appear at the right marks.
- Quiz works end‑to‑end (test at least one chapter per book).
- Hard‑reload with cache disabled (CDP `Network.setCacheDisabled` or `Ctrl+F5`).
