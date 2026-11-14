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
    // Study Unit 7 Part 1: the Zinn triad, three weights the court must hold at once.
    reset(C(400, 96, 22, 'a') +
      `<g class="t swap-a" style="--k:${k++}"><circle cx="316" cy="96" r="14" fill="currentColor" stroke="none"/></g>` +
      `<g class="t swap-b" style="--k:${k++}"><circle cx="484" cy="96" r="14" fill="currentColor" stroke="none"/></g>` +
      P('M316 96h168', 'a') + P('M400 74v-30', 'a') +
      Tx(250, 40, 'crime \u00b7 offender \u00b7 society', 22, 'a') +
      Tx(400, 176, 'S v Zinn', 22, '', 'middle')),
  ];
})();
