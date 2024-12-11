type FieldKey = "day" | "month" | "year";

export type Inputs = Record<FieldKey, string>;

export type Fields = Array<{
  key: FieldKey;
  label: string;
  placeholder: string;
  rules: Object;
}>;
