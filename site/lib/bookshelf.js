/* Website-only bookshelf behaviour: old root links, the About note, and a "Continue" note on books the reader has started. */
'use strict';
(() => {
  // Old root hashes referred to the first book before each book had its own folder.
  const legacyBook = () => {
    if (/^#(?:book|contents|ch\d{2})$/.test(location.hash)) {
      const target = new URL('su3-indictments/', location.href);
      target.search = location.search;
      target.hash = location.hash;
      location.replace(target.href);
    }
  };
  legacyBook();
  addEventListener('hashchange', legacyBook);
  const books = [
    { id: 'su3-indictments', key: 'animebook:progress:' + new URL('su3-indictments/', location.href).pathname,
      chapterBase: 'su3-indictments/', chapters: 6 },
    { id: 'su5p1-plea-guilty', key: 'animebook:progress:' + new URL('su5p1-plea-guilty/', location.href).pathname,
      chapterBase: 'su5p1-plea-guilty/', chapters: 6 },
    { id: 'su5p2-plea-not-guilty', key: 'animebook:progress:' + new URL('su5p2-plea-not-guilty/', location.href).pathname,
      chapterBase: 'su5p2-plea-not-guilty/', chapters: 5 },
    { id: 'su6-trial-verdict', key: 'animebook:progress:' + new URL('su6-trial-verdict/', location.href).pathname,
      chapterBase: 'su6-trial-verdict/', chapters: 6 },
    { id: 'su7p1-sentence', key: 'animebook:progress:' + new URL('su7p1-sentence/', location.href).pathname,
      chapterBase: 'su7p1-sentence/', chapters: 6 },
    { id: 'su7p2-sentence-procedure', key: 'animebook:progress:' + new URL('su7p2-sentence-procedure/', location.href).pathname,
      chapterBase: 'su7p2-sentence-procedure/', chapters: 6 },
    { id: 'sip14-defective-processes', key: 'animebook:progress:' + new URL('sip14-defective-processes/', location.href).pathname,
      chapterBase: 'sip14-defective-processes/', chapters: 1 },
    { id: 'sip15-settlement-offers', key: 'animebook:progress:' + new URL('sip15-settlement-offers/', location.href).pathname,
      chapterBase: 'sip15-settlement-offers/', chapters: 1 },
    { id: 'sip16-plea-counterclaim', key: 'animebook:progress:' + new URL('sip16-plea-counterclaim/', location.href).pathname,
      chapterBase: 'sip16-plea-counterclaim/', chapters: 1 },
    { id: 'sip17-amendment-pleadings', key: 'animebook:progress:' + new URL('sip17-amendment-pleadings/', location.href).pathname,
      chapterBase: 'sip17-amendment-pleadings/', chapters: 1 },
    { id: 'sip19-trial-judgment', key: 'animebook:progress:' + new URL('sip19-trial-judgment/', location.href).pathname,
      chapterBase: 'sip19-trial-judgment/', chapters: 1 },
    { id: 'sip20-provisional-sentence', key: 'animebook:progress:' + new URL('sip20-provisional-sentence/', location.href).pathname,
      chapterBase: 'sip20-provisional-sentence/', chapters: 1 },
    { id: 'sip21-appeals-reviews', key: 'animebook:progress:' + new URL('sip21-appeals-reviews/', location.href).pathname,
      chapterBase: 'sip21-appeals-reviews/', chapters: 1 },
    { id: 'sip22-execution', key: 'animebook:progress:' + new URL('sip22-execution/', location.href).pathname,
      chapterBase: 'sip22-execution/', chapters: 1 },
    { id: 'sip23-debt-collection', key: 'animebook:progress:' + new URL('sip23-debt-collection/', location.href).pathname,
      chapterBase: 'sip23-debt-collection/', chapters: 1 },
    { id: 'sip24-legal-costs', key: 'animebook:progress:' + new URL('sip24-legal-costs/', location.href).pathname,
      chapterBase: 'sip24-legal-costs/', chapters: 1 },
  ];
  for (const book of books) {
    const cover = document.querySelector(`[data-book="${book.id}"]`);
    if (!cover) continue;
    let saved;
    try { saved = JSON.parse(localStorage.getItem(book.key) || '{}'); } catch { continue; }
    if (!saved || !Number.isInteger(saved.last) || saved.last < 1 || saved.last > book.chapters) continue;
    const resume = document.createElement('a');
    resume.className = 'resume-label';
    resume.textContent = `Continue: Chapter ${saved.last}`;
    resume.href = `${book.chapterBase}ch${String(saved.last).padStart(2, '0')}/`;
    const slot = document.createElement('div');   // a link can't hold a link: the note sits beside the cover, over it
    slot.className = 'book-slot';
    cover.replaceWith(slot);
    slot.append(cover, resume);
  }
})();
