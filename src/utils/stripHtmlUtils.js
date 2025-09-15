// Helper: strip HTML ke plain text
export const stripHtmlUtils = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};
