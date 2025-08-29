'use client';

import { useEffect, useState } from 'react';
import { useSearchStore } from '../store/use-search-store';

export const useSearch = () => {
  const { query, setQuery, clearSearch } = useSearchStore();
  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    // Prevent running during SSR
    if (typeof window === 'undefined') return;
    
    const timeoutId = setTimeout(() => {
      if (!query) {
        setMatchCount(0);
        // Clear previous search highlights and hidden elements
        document.querySelectorAll('[data-search-hidden]').forEach(el => {
          el.removeAttribute('data-search-hidden');
          (el as HTMLElement).style.display = '';
        });
        document.querySelectorAll('.search-highlight').forEach(el => {
          const parent = el.parentNode;
          if (parent) {
            parent.replaceChild(document.createTextNode(el.textContent || ''), el);
            parent.normalize();
          }
        });
        return;
      }

      // Clear previous highlights first
      document.querySelectorAll('.search-highlight').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });

      const searchableElements = document.querySelectorAll('main *');
      let matches = 0;

      searchableElements.forEach(el => {
        const element = el as HTMLElement;
        if (element.children.length === 0 && element.textContent?.trim()) {
          const text = element.textContent;
          const regex = new RegExp(`(${query})`, 'gi');
          
          if (text.toLowerCase().includes(query.toLowerCase())) {
            matches++;
            const highlightedHTML = text.replace(regex, '<span class="search-highlight bg-yellow-200 dark:bg-yellow-800">$1</span>');
            element.innerHTML = highlightedHTML;
            
            // Show parent elements
            let parent = element.parentElement;
            while (parent && parent !== document.body) {
              parent.removeAttribute('data-search-hidden');
              (parent as HTMLElement).style.display = '';
              parent = parent.parentElement;
            }
          }
        }
      });

      // Hide elements that don't match
      document.querySelectorAll('main > *').forEach(el => {
        const element = el as HTMLElement;
        if (!element.querySelector('.search-highlight') && !element.textContent?.toLowerCase().includes(query.toLowerCase())) {
          element.setAttribute('data-search-hidden', 'true');
          element.style.display = 'none';
        }
      });

      setMatchCount(matches);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { query, setQuery, clearSearch, matchCount };
};