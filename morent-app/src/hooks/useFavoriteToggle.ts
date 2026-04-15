import { useFavoritesStore } from '@/stores/favorites';

export const useFavoriteToggle = (
  documentId: string,
  serverFavorite: boolean,
  onFavoriteToggle?: (favorite: boolean) => Promise<void>,
) => {
  const overrides = useFavoritesStore((state) => state.overrides);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const currentFavorite =
    documentId in overrides ? overrides[documentId] : serverFavorite;

  const handleFavoriteToggle = async () => {
    const next = !currentFavorite;

    toggleFavorite(documentId, next);

    if (!onFavoriteToggle) {
      return;
    }

    try {
      await onFavoriteToggle(next);
    } catch (error) {
      toggleFavorite(documentId, !next);
      console.error('Failed to toggle favorite status:', error);
    }
  };

  return { isFavorite: currentFavorite, handleFavoriteToggle };
};
