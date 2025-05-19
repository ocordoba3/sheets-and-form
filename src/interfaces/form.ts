import type { Path } from "react-hook-form";

export interface FormStructure<T> {
  sectionTitle: string;
  fields: Field<T>[];
}

export interface Field<T> {
  field: Path<T>;
  label: string;
  type: FieldType;
  isRequired: boolean;
  options?: string[];
}

export type FieldType =
  | "select"
  | "date"
  | "datetime"
  | "select_and_amount"
  | "multi_select_and_amount";
