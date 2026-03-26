// Lib
import { Schema } from 'effect';

export interface Location {
  value: string;
  label: string;
}

export const LocationSchema = Schema.Struct({
  value: Schema.String,
  label: Schema.String,
});

export interface SectionValues {
  location: string | undefined;
  date: Date | undefined;
  time: string | undefined;
}

export const PickDropFormSchema = Schema.Struct({
  pickUp: Schema.Struct({
    location: Schema.String,
    date: Schema.DateFromString,
    time: Schema.String,
  }),
  dropOff: Schema.Struct({
    location: Schema.String,
    date: Schema.DateFromString,
    time: Schema.String,
  }),
});

export type PickDropForm = typeof PickDropFormSchema.Type;
