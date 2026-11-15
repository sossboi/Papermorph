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
    // SIP421 ch 18: a discovery bundle — a document with its schedule, and a magnifier over it.
    reset(P('M250 40h170v100H250z') + P('M268 62h134', 'a') + P('M268 84h134', 'a') +
      P('M268 106h90', 'a') +
      P('M470 96a34 34 0 1 0 0.1 0', 'a') + P('M496 122l34 34', '') +
      Tx(250, 30, 'discovery', 22, 'a') +
      Tx(400, 176, '20 · 5 · 5 · 10', 20, '', 'middle')),
  ];
})();
