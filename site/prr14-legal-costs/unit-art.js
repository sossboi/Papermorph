// Chalk sketches for the unit headers on the contents page, one per unit, drawn in the unit's colour.
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 24, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const ARW = d => `<path class="t swap-a" style="--k:${k++}" d="${d}" stroke="currentColor" stroke-width="5" fill="none"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    reset(P('M250 50h150v70h-150z') + P('M250 50v70', 'a') + ARW('M400 85h70') + P('M470 50h150v70h-150z') + P('M470 50v70', 'a') + P('M300 140h200', 'a')) +
      Tx(250, 140, "the bill", 22, 'a', 'middle') +
      Tx(470, 140, "the allocatur", 20, 'a', 'middle') +
      Tx(400, 172, "taxation", 22, '', 'middle')),
  ];
})();
