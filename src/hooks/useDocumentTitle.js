import { useEffect } from 'react';

/**
 * Sets the browser document title for the current page.
 * @param {string} title
 */
function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
}

export default useDocumentTitle;
