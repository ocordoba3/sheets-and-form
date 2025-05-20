export interface Form {
  sectionTitle: string;
  fields: Field[];
}

export interface Field {
  field: string;
  label: string;
  type: FieldType;
  isRequired: boolean;
  options?: string[];
}

export type FieldType =
  | "select"
  | "date"
  | "datetime"
  | "multi_select_and_amount";
