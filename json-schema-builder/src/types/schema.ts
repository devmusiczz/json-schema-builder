export type FieldType = 'string' | 'number' | 'nested' | 'bool' | "Select";

export interface SchemaField {
  id: string;
  Select : null;
  name: string;
  bool : boolean;
  type: FieldType;
  children?: SchemaField[];
}

export interface SchemaFormData {
  fields: SchemaField[];
}
