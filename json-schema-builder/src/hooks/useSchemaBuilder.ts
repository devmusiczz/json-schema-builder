import { useState } from 'react';
import type { SchemaField } from '../types/schema';
import { generateSchema } from '../utils/schemaGenerator';

export function useSchemaBuilder(initial: SchemaField[] = []) {
  const [fields, setFields] = useState<SchemaField[]>(initial);

//   const set = setFields;

  const schema = generateSchema(fields);

  return { fields, setFields, schema };
}
