export type FieldType = "string" | "number" | "nested";

export interface Field {
  id?: string;
  key?: string;
  type?: string;
  children?: Field[];
}