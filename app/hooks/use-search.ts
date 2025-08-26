'use client';

import { useEffect, useState } from 'react';
import { useSearchStore } from '../store/use-search-store';

export const useSearch = () => {
  const { query, setQuery, clearSearch } = useSearchStore();
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    if (!query) {
      setMatchCount(0);
      document.querySelectorAll('[data-search-hidden]').forEach(el => {
        el.removeAttribute('data-search-hidden');
        (el as HTMLElement).style.display = '';
      });
      document.querySelectorAll('.search-highlight').forEach(el => {
        el.outerHTML = el.innerHTML;
      });
      return;
    }

    const searchableElements = document.querySelectorAll('main *');
    let matches = 0;

    searchableElements.forEach(el => {
      const element = el as HTMLElement;
      if (element.children.length === 0 && element.textContent?.trim()) {
        const text = element.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        
        if (text.toLowerCase().includes(query.toLowerCase())) {
          matches++;
          element.innerHTML = text.replace(regex, '<span class="search-highlight bg-yellow-200 dark:bg-yellow-800">$1</span>');
          
          let parent = element.parentElement;
          while (parent && parent !== document.body) {
            parent.removeAttribute('data-search-hidden');
            (parent as HTMLElement).style.display = '';
            parent = parent.parentElement;
          }
        }
      }
    });

    document.querySelectorAll('main > *').forEach(el => {
      const element = el as HTMLElement;
      if (!element.querySelector('.search-highlight') && !element.textContent?.toLowerCase().includes(query.toLowerCase())) {
        element.setAttribute('data-search-hidden', 'true');
        element.style.display = 'none';
      }
    });

    setMatchCount(matches);
  }, [query]);

  return { query, setQuery, clearSearch, matchCount };
};