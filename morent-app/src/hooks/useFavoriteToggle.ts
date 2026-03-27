import { useOptimistic, useTransition } from 'react';

export const useFavoriteToggle = (
  favorite: boolean,
  onFavoriteToggle?: (favorite: boolean) => Promise<void>,
) => {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    favorite,
    (_current: boolean, next: boolean) => next,
  );
  const [, startTransition] = useTransition();

  const handleFavoriteToggle = () => {
    const next = !optimisticFavorite;

    startTransition(async () => {
      setOptimisticFavorite(next);

      try {
        await onFavoriteToggle?.(next);
      } catch (error) {
        console.error('Failed to toggle favorite status:', error);
      }
    });
  };

  return { optimisticFavorite, handleFavoriteToggle };
};
