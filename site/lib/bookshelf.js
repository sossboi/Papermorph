/* Website-only bookshelf behaviour: old root links, the About note, and a "Continue" note on books the reader has started. */
'use strict';
(() => {
  // Old root hashes referred to the first book before each book had its own folder.
  const legacyBook = () => {
    if (/^#(?:book|contents|ch\d{2})$/.test(location.hash)) {
      const target = new URL('prr2-divorce/', location.href);
      target.search = location.search;
      target.hash = location.hash;
      location.replace(target.href);
    }
  };
  legacyBook();
  addEventListener('hashchange', legacyBook);
  const books = [
    { id: 'prr2-divorce', key: 'animebook:progress:' + new URL('prr2-divorce/', location.href).pathname,
      chapterBase: 'prr2-divorce/', chapters: 5 },
    { id: 'prr3-application-proceedings', key: 'animebook:progress:' + new URL('prr3-application-proceedings/', location.href).pathname,
      chapterBase: 'prr3-application-proceedings/', chapters: 3 },
    { id: 'prr4-maintenance', key: 'animebook:progress:' + new URL('prr4-maintenance/', location.href).pathname,
      chapterBase: 'prr4-maintenance/', chapters: 2 },
    { id: 'prr5-child-law', key: 'animebook:progress:' + new URL('prr5-child-law/', location.href).pathname,
      chapterBase: 'prr5-child-law/', chapters: 4 },
    { id: 'prr6-domestic-violence', key: 'animebook:progress:' + new URL('prr6-domestic-violence/', location.href).pathname,
      chapterBase: 'prr6-domestic-violence/', chapters: 3 },
    { id: 'prr12-ethics', key: 'animebook:progress:' + new URL('prr12-ethics/', location.href).pathname,
      chapterBase: 'prr12-ethics/', chapters: 3 },
    { id: 'prr14-legal-costs', key: 'animebook:progress:' + new URL('prr14-legal-costs/', location.href).pathname,
      chapterBase: 'prr14-legal-costs/', chapters: 2 },
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
