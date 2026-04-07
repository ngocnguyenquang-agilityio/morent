import { create } from 'zustand';

type FilterSidebarState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const useFilterSidebarStore = create<FilterSidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export { useFilterSidebarStore };
export type { FilterSidebarState };
