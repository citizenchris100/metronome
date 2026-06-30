# Metronome

A clean, fully-offline metronome you can install to your phone or iPad home screen
(an installable PWA). No accounts, no ads, no network — everything runs locally.

## Features

- Tempo dial (20–300 BPM) with tap tempo, ±1 nudges, and direct entry
- 16 time signatures, including compound meters felt in their dotted-quarter pulse
  (`6/8 ♩.`, `9/8 ♩.`, `12/8 ♩.`)
- Meter-aware accents: off, downbeat-only, or metric grouping presets per meter
  (e.g. 7/8 as 3+2+2, 2+2+3, 4+3, …) with a 3-tier click (downbeat ▸ group ▸ beat)
- Beat-dot indicator that shows the grouping, plus a live beat counter
- Subdivisions: quarter, eighths, triplet, sixteenths
- Sample-accurate timing via a Web Audio lookahead scheduler (synthesized clicks —
  no audio files, so it works with zero network)
- Keeps the screen awake while playing; remembers your last settings on the device
- Deep links: `?tempo=120&timeSignature=2&pattern=1`
  (`timeSignature` is a 0-based index into the list; `pattern` is the subdivision 1–4)

## Install on iPhone / iPad

Open the page in **Safari**, then **Share → Add to Home Screen**. After that first
load it launches fullscreen with its own icon and runs completely offline.

## Run locally

It's a static site — serve the folder over any local web server (a service worker
needs `http(s)://` or `localhost`, not `file://`):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Updating

Edit the files, bump the `CACHE` version string in `sw.js` (e.g. `metro-v2` →
`metro-v3`) so installed devices fetch the new version, and redeploy.

---

A clean-room rebuild of a simple online metronome's feature set, built to run offline.

## License

© 2026 citizenchris100

Licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.

You are free to use, study, share, and adapt this — **as long as you keep it open under the same license, give credit, and do not sell it or use it commercially.** Full terms are in [`LICENSE`](LICENSE); plain-language summary at <https://creativecommons.org/licenses/by-nc-sa/4.0/>.
