import { create } from 'zustand';

type FavoritesState = {
  overrides: Record<string, boolean>;
  getFavorite: (documentId: string, serverFavorite: boolean) => boolean;
  toggleFavorite: (documentId: string, next: boolean) => void;
};

const useFavoritesStore = create<FavoritesState>((set, get) => ({
  overrides: {},
  getFavorite: (documentId, serverFavorite) => {
    const { overrides } = get();
    return documentId in overrides ? overrides[documentId] : serverFavorite;
  },
  toggleFavorite: (documentId, next) =>
    set((state) => ({
      overrides: { ...state.overrides, [documentId]: next },
    })),
}));

export { useFavoritesStore };
export type { FavoritesState };
