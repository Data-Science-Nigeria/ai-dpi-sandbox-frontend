import { create } from 'zustand';

interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  clearSearch: () => set({ query: '' }),
}));