"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSearchStore } from "../store/use-search-store";

export const useSearch = () => {
  const {
    query,
    currentMatchIndex,
    setQuery,
    setCurrentMatchIndex,
    clearSearch,
  } = useSearchStore();
  const [matchCount, setMatchCount] = useState(0);
  const [matches, setMatches] = useState<HTMLElement[]>([]);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  // Clear search when pathname changes
  useEffect(() => {
    if (prevPathnameRef.current !== pathname && query) {
      clearSearch();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, clearSearch, query]);

  useEffect(() => {
    // Prevent running during SSR
    if (typeof window === "undefined") return;

    const timeoutId = setTimeout(() => {
      if (!query) {
        setMatchCount(0);
        setMatches([]);
        // Clear previous search highlights and hidden elements
        document.querySelectorAll("[data-search-hidden]").forEach((el) => {
          el.removeAttribute("data-search-hidden");
          (el as HTMLElement).style.display = "";
        });
        document.querySelectorAll(".search-highlight").forEach((el) => {
          const parent = el.parentNode;
          if (parent) {
            parent.replaceChild(
              document.createTextNode(el.textContent || ""),
              el
            );
            parent.normalize();
          }
        });
        return;
      }

      // Clear previous highlights first
      document
        .querySelectorAll(".search-highlight, .search-highlight-active")
        .forEach((el) => {
          const parent = el.parentNode;
          if (parent) {
            parent.replaceChild(
              document.createTextNode(el.textContent || ""),
              el
            );
            parent.normalize();
          }
        });

      const searchableElements = document.querySelectorAll("main *");

      searchableElements.forEach((el) => {
        const element = el as HTMLElement;
        if (element.children.length === 0 && element.textContent?.trim()) {
          const text = element.textContent;
          const regex = new RegExp(`(${query})`, "gi");

          if (text.toLowerCase().includes(query.toLowerCase())) {
            const highlightedHTML = text.replace(
              regex,
              '<span class="search-highlight bg-yellow-200 dark:bg-yellow-800">$1</span>'
            );
            element.innerHTML = highlightedHTML;

            // Show parent elements
            let parent = element.parentElement;
            while (parent && parent !== document.body) {
              parent.removeAttribute("data-search-hidden");
              (parent as HTMLElement).style.display = "";
              parent = parent.parentElement;
            }
          }
        }
      });

      // Hide elements that don't match
      document.querySelectorAll("main > *").forEach((el) => {
        const element = el as HTMLElement;
        if (
          !element.querySelector(".search-highlight") &&
          !element.textContent?.toLowerCase().includes(query.toLowerCase())
        ) {
          element.setAttribute("data-search-hidden", "true");
          element.style.display = "none";
        }
      });

      // Store match elements for navigation and count them
      const matchElements = Array.from(
        document.querySelectorAll(".search-highlight")
      ) as HTMLElement[];
      setMatches(matchElements);
      setMatchCount(matchElements.length);

      // Highlight first match if there are matches
      if (matchElements.length > 0) {
        matchElements[0].classList.add("search-highlight-active");
        setCurrentMatchIndex(0);
      }
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  const navigateToMatch = (direction: "next" | "prev") => {
    if (matches.length === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex =
        currentMatchIndex >= matches.length - 1 ? 0 : currentMatchIndex + 1;
    } else {
      newIndex =
        currentMatchIndex <= 0 ? matches.length - 1 : currentMatchIndex - 1;
    }

    setCurrentMatchIndex(newIndex);

    // Remove previous active highlight
    matches.forEach((match) =>
      match.classList.remove("search-highlight-active")
    );

    // Add active highlight to current match
    if (matches[newIndex]) {
      matches[newIndex].classList.add("search-highlight-active");
      matches[newIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleEnterPress = () => {
    if (matches.length > 0) {
      navigateToMatch("next");
    }
  };

  return {
    query,
    setQuery,
    clearSearch,
    matchCount,
    currentMatchIndex: matchCount > 0 ? currentMatchIndex + 1 : 0,
    navigateToMatch,
    handleEnterPress,
  };
};
