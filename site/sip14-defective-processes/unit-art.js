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
    // SIP421 ch 14: a pleading with a defect, struck through and cured.
    reset(P('M250 60h180v92H250z') + P('M270 84h140', 'a') + P('M270 106h140', 'a') + P('M270 128h90', 'a') +
      P('M250 60l180 92', 'a') +
      `<path class="t cut" style="--k:${k++}" d="M250 60l180 92"/>` +
      P('M470 96h60', '') + P('M500 66v60', 'a') +
      Tx(250, 40, 'exception \u00b7 strike out \u00b7 irregular step', 22, 'a') +
      Tx(400, 176, 'HCR 23 \u00b7 HCR 30 \u00b7 MCR 60A', 20, '', 'middle')),
  ];
})();
