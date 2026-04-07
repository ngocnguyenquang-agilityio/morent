'use client';

// Lib
import { useCallback, useRef } from 'react';

// Constants
import { FILTER_DEBOUNCE_DELAY } from '@/constants/filter';

export type TUseDebounce<T> = (value: T) => void;

export const useDebounce = <T>(callback?: TUseDebounce<T>): TUseDebounce<T> => {
  const refTime = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debounce = useCallback(
    (value: T): void => {
      if (refTime.current) clearTimeout(refTime.current);

      refTime.current = setTimeout(() => {
        if (callback) callback(value);
      }, FILTER_DEBOUNCE_DELAY);
    },
    [callback],
  );

  return debounce;
};
