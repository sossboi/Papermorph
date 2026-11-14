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
    // SIP421 ch 21: appeal and review, two routes upward from the decision.
    reset(P('M250 150h300', 'a') + P('M290 150V96h110v54') + P('M400 96V44h110v106', 'a') +
      P('M290 96l55 -30', '') + P('M345 66l-55 30', 'a') +
      `<circle class="t hop" r="7" fill="currentColor" stroke="none" style="--k:${k++};offset-path:path('M290 150V96h110V44h110')"/>` +
      Tx(250, 34, 'appeal \u00b7 review', 22, 'a') +
      Tx(400, 176, 'from the lower court upward', 20, '', 'middle')),
  ];
})();
