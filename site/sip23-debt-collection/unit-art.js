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
    // SIP421 ch 23: the debtor's pay packet measured out, part to the creditor, part kept.
    reset(P('M250 52h180v96H250z') + P('M270 74h140', 'a') + P('M270 96h140', 'a') +
      P('M430 148l52 -16', '') + P('M482 132l-52 16', 'a') +
      `<g class="t breathe" style="--k:${k++}"><path d="M250 52v96" fill="none"/></g>` +
      `<circle class="t" style="--k:${k++}" cx="292" cy="124" r="11" fill="currentColor" stroke="none" opacity=".55"/>` +
      Tx(250, 34, 's 65 enquiry', 22, 'a') +
      Tx(400, 176, '25% of basic salary', 20, '', 'middle')),
  ];
})();
