// Chalk sketches for the unit headers on the contents page, one per unit, drawn in the unit's colour.
// Each entry is the inside of an SVG with viewBox 0 0 600 180; keep the left ~200 px light (the unit title sits there
// on narrow screens). Classes, styled in lib/units.css:
//   d  a stroke that draws itself in when the unit scrolls into view (--k orders the strokes)
//   t  text or a filled shape that fades in
//   a  faint chalk white instead of the unit colour;  faint  even fainter
// A sketch may add one looping motion after it is drawn: give an element a class that lib/units.css animates (swap-a,
// hop, orbit, ride, spin, tilt, breathe, ...), or add your own .seen .unit-art .NAME rule and keyframes in a <style> in index.html.
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 24, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    // Topic One: a speech bubble (the representation) with a shield before it (estoppel bars the denial).
    reset(P('M250 52h150a14 14 0 0 1 14 14v34a14 14 0 0 1 -14 14h-96l-22 20v-20h-32a14 14 0 0 1 -14 -14v-34a14 14 0 0 1 14 -14z') +
      P('M268 78h114', 'a') + P('M268 98h76', 'a') +
      P('M452 60l64 22v34a34 34 0 0 1 -34 34h-30v22l-26 -22h-4', '') +
      P('M452 60l64 22', 'a') +
      `<path class="t swap-a" style="--k:${k++}" d="M484 74l10 12h-20z" fill="currentColor" stroke="none"/>` +
      Tx(250, 34, 'representation → belief → reliance → prejudice', 21, 'a') +
      Tx(400, 176, 'obstringitur · exceptio doli · nemo contra suum factum', 19, '', 'middle')),
  ];
})();
