import { create } from "zustand";

interface SearchStore {
  query: string;
  currentMatchIndex: number;
  setQuery: (query: string) => void;
  setCurrentMatchIndex: (index: number) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  currentMatchIndex: 0,
  setQuery: (query) => set({ query, currentMatchIndex: 0 }),
  setCurrentMatchIndex: (index) => set({ currentMatchIndex: index }),
  clearSearch: () => set({ query: "", currentMatchIndex: 0 }),
}));
