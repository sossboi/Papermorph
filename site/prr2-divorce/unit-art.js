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
    reset(P('M250 60h140v60h-140z') + P('M250 60v60', 'a') + ARW('M390 90h90') + P('M480 60h140v60h-140z') + P('M480 60v60', 'a') + P('M320 130h160', 'a') +
      Tx(250, 140, "the marriage", 22, 'a', 'middle') +
      Tx(480, 140, "the decree", 22, 'a', 'middle') +
      Tx(400, 172, "irretrievable breakdown", 20, '', 'middle')),
  ];
})();
