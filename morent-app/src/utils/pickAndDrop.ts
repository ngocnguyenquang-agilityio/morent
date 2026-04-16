// Constants
import { PICK_DROP_PARAMS } from '@/constants/pickAndDrop';

// Types
import type { SectionValues } from '@/types/pickAndDrop';

type ReadableParams = { get: (key: string) => string | null };
type ResolvedSearchParams = Record<string, string | string[] | undefined>;

const getStringParam = (
  params: ReadableParams,
  key: string,
): string | undefined => params.get(key) ?? undefined;

const getDateParam = (
  params: ReadableParams,
  key: string,
): Date | undefined => {
  const value = params.get(key);
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
};

export const deserializePickDropFromParams = (
  params: ReadableParams,
): { pickUp: SectionValues; dropOff: SectionValues } => ({
  pickUp: {
    location: getStringParam(params, PICK_DROP_PARAMS.PICK_UP_LOCATION),
    date: getDateParam(params, PICK_DROP_PARAMS.PICK_UP_DATE),
    time: getStringParam(params, PICK_DROP_PARAMS.PICK_UP_TIME),
  },
  dropOff: {
    location: getStringParam(params, PICK_DROP_PARAMS.DROP_OFF_LOCATION),
    date: getDateParam(params, PICK_DROP_PARAMS.DROP_OFF_DATE),
    time: getStringParam(params, PICK_DROP_PARAMS.DROP_OFF_TIME),
  },
});

export const serializePickDropToParams = (
  pickUp: SectionValues,
  dropOff: SectionValues,
  existing: URLSearchParams,
): URLSearchParams => {
  const params = new URLSearchParams(existing.toString());

  const setOrDelete = (key: string, value: string | undefined) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  };

  setOrDelete(PICK_DROP_PARAMS.PICK_UP_LOCATION, pickUp.location);
  setOrDelete(PICK_DROP_PARAMS.PICK_UP_DATE, pickUp.date?.toISOString());
  setOrDelete(PICK_DROP_PARAMS.PICK_UP_TIME, pickUp.time);
  setOrDelete(PICK_DROP_PARAMS.DROP_OFF_LOCATION, dropOff.location);
  setOrDelete(PICK_DROP_PARAMS.DROP_OFF_DATE, dropOff.date?.toISOString());
  setOrDelete(PICK_DROP_PARAMS.DROP_OFF_TIME, dropOff.time);

  return params;
};

export const getPickDropDefaultValues = (
  searchParams: ResolvedSearchParams,
): {
  pickUp: { location: string; date: Date | undefined; time: string };
  dropOff: { location: string; date: Date | undefined; time: string };
} => {
  const get = (key: string): string | null => {
    const val = searchParams[key];
    if (!val) return null;
    return Array.isArray(val) ? val[0] : val;
  };

  const pickUpDateStr = get(PICK_DROP_PARAMS.PICK_UP_DATE);
  const dropOffDateStr = get(PICK_DROP_PARAMS.DROP_OFF_DATE);

  const parseDate = (str: string | null): Date | undefined => {
    if (!str) return undefined;
    const date = new Date(str);
    return isNaN(date.getTime()) ? undefined : date;
  };

  return {
    pickUp: {
      location: get(PICK_DROP_PARAMS.PICK_UP_LOCATION) ?? '',
      date: parseDate(pickUpDateStr),
      time: get(PICK_DROP_PARAMS.PICK_UP_TIME) ?? '',
    },
    dropOff: {
      location: get(PICK_DROP_PARAMS.DROP_OFF_LOCATION) ?? '',
      date: parseDate(dropOffDateStr),
      time: get(PICK_DROP_PARAMS.DROP_OFF_TIME) ?? '',
    },
  };
};

export const extractPickDropParams = (
  params: ReadableParams,
): URLSearchParams => {
  const result = new URLSearchParams();
  Object.values(PICK_DROP_PARAMS).forEach((key) => {
    const val = params.get(key);
    if (val) result.set(key, val);
  });
  return result;
};
