// Chalk sketches for the unit headers on the contents page, one per unit, drawn in the unit's colour.
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 24, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  // the arrow between two estates: a faint chalk line with a head
  const ARW = d => `<path class="t swap-a" style="--k:${k++}" d="${d}" stroke="currentColor" stroke-width="5" fill="none"/>`;
  const reset = s => { k = 0; return s; };

  window.UNIT_ART = [
    reset(P('M250 40h180a20 20 0 0 1 20 -20v-20a20 20 0 0 1 20 20z') + P('M250 40v-20a20 20 0 0 1 20 -20', 'a') + P('M470 40h180a20 20 0 0 1 20 20v20a20 20 0 0 1 -20 20h-180a20 20 0 0 1 -20 -20v-20a20 20 0 0 1 20 -20z') + P('M470 40v-20a20 20 0 0 1 20 -20', 'a') + ARW('M440 40h34') +
      Tx(250, 110, "impoverished", 22, 'a', 'middle') +
      Tx(470, 110, "enriched", 22, 'a', 'middle') +
      Tx(400, 176, "sine causa \u00b7 no legal ground", 20, '', 'middle')),
  ];
})();
