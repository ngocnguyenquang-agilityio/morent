type ResolvedSearchParams = Record<string, string | string[] | undefined>;

type ReadableSearchParams = { get: (key: string) => string | null };

export const parseSearchParam = <T>(
  params: ReadableSearchParams,
  key: string,
  parser: (value: string | null) => T,
): T => parser(params.get(key));

export const setArrayParam = (
  params: URLSearchParams,
  key: string,
  values: readonly (string | number)[],
) => {
  if (values.length > 0) {
    params.set(key, values.join(','));
  } else {
    params.delete(key);
  }
};

export const toURLSearchParams = (
  resolvedParams: ResolvedSearchParams,
): URLSearchParams =>
  new URLSearchParams(
    Object.entries(resolvedParams)
      .filter(
        (entry): entry is [string, string | string[]] => entry[1] !== undefined,
      )
      .map(([key, value]): [string, string] => [
        key,
        Array.isArray(value) ? value[0] : value,
      ]),
  );

export const mergeSearchParams = (
  base: { toString(): string },
  overrides: Record<string, string | number | null | undefined>,
): URLSearchParams => {
  const merged = new URLSearchParams(base.toString());
  for (const [key, value] of Object.entries(overrides)) {
    if (value === null || value === undefined) {
      merged.delete(key);
    } else {
      merged.set(key, String(value));
    }
  }
  return merged;
};
