// Lib
import { Data, Effect, ParseResult, Schema } from 'effect';
import qs from 'qs';

export const buildQuery = (params: Record<string, unknown>): string =>
  qs.stringify(params, { encodeValuesOnly: true });

/** Creates a tagged Effect error class with a message and cause. */
export const makeServiceError = <const Tag extends string>(tag: Tag) =>
  Data.TaggedError(tag)<{ message: string; cause: unknown }>;

/** Tagged error for Schema decode failures. */
export class SchemaDecodeError extends makeServiceError('SchemaDecodeError') {}

/** Fetches a URL and returns the parsed JSON body, failing with a typed error on non-2xx status or network/parse errors. */
export const fetchJson = <E>(
  url: string,
  onError: (cause: unknown) => E,
  options?: RequestInit,
): Effect.Effect<unknown, E> =>
  Effect.tryPromise({ try: () => fetch(url, options), catch: onError }).pipe(
    // Fail early if the server returned a non-2xx status
    Effect.filterOrFail(
      (res) => res.ok,
      (res) => onError(res.statusText),
    ),
    Effect.flatMap((res) =>
      Effect.tryPromise({
        try: () => res.json() as Promise<unknown>,
        catch: onError,
      }),
    ),
  );

/** Fetches a URL, parses the JSON body, and decodes it against a Schema, yielding a fully typed value. */
export const fetchAndParse = <A, I, E1, E2>(
  url: string,
  schema: Schema.Schema<A, I>,
  onFetchError: (cause: unknown) => E1,
  onDecodeError: (e: ParseResult.ParseError) => E2,
  options?: RequestInit,
): Effect.Effect<A, E1 | E2> =>
  fetchJson(url, onFetchError, options).pipe(
    Effect.flatMap((json) =>
      Schema.decodeUnknown(schema)(json).pipe(Effect.mapError(onDecodeError)),
    ),
  );
