import { Fields, Inputs } from "./types";

export const fields: Fields = [
  {
    key: "day",
    label: "Day",
    placeholder: "DD",
    rules: {
      required: { value: true, message: "This field is required" },
      max: { value: 31, message: "Must be a valid day" },
      min: { value: 1, message: "Must be a valid day" },
    },
  },
  {
    key: "month",
    label: "Month",
    placeholder: "MM",
    rules: {
      required: { value: true, message: "This field is required" },
      max: { value: 12, message: "Must be a valid month" },
      min: { value: 1, message: "Must be a valid month" },
    },
  },
  {
    key: "year",
    label: "Year",
    placeholder: "YYYY",
    rules: {
      required: { value: true, message: "This field is required" },
      max: {
        value: new Date().getFullYear(),
        message: "Must be in the past",
      },
    },
  },
];

export const DEFAULT_AGE: Inputs = {
  year: "--",
  month: "--",
  day: "--",
};
