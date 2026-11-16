// Chalk sketches for the unit headers on the contents page, one per unit, drawn in the unit's colour.
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 24, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const ARW = d => `<path class="t swap-a" style="--k:${k++}" d="${d}" stroke="currentColor" stroke-width="5" fill="none"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    reset(P('M250 50h130v60h-130z') + P('M250 50v60', 'a') + ARW('M380 80h80') + P('M460 50h130v60h-130z') + P('M460 50v60', 'a') +
      Tx(250, 140, "facts \u2192 issue", 22, 'a', 'middle') +
      Tx(460, 140, "generics \u2192 remedy", 22, 'a', 'middle') +
      Tx(400, 176, "tense test \u00b7 specific requirements", 20, '', 'middle')),
  ];
})();
