import { useEffect } from 'react';

/**
 * Sets the browser document title for the current page and restores the
 * previous title when the component unmounts.
 * @param {string} title
 */
function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return undefined;

    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;