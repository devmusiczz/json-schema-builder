import { useState } from 'react';
import type { SchemaField, FieldType } from '../types/schema';

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useFieldArray(initial: SchemaField[] = []) {
  const [fields, setFields] = useState<SchemaField[]>(initial);

  const add = (type: FieldType = 'Select', children?: SchemaField[]) => {
    setFields((prev) => [
      ...prev,
      { id: uuid(), name: '', Select: null , bool: true , type, ...(type === 'nested' ? { children: children || [] } : {}) }
    ]);
  };

  const update = (idx: number, field: Partial<SchemaField>) => {
    setFields((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, ...field } : f))
    );
  };

  const remove = (idx: number) => {
    setFields((prev) => prev.filter((_, i) => i !== idx));
  };

  const set = (newFields: SchemaField[]) => {
    setFields(newFields);
  };

  return { fields, add, update, remove, set };
}
