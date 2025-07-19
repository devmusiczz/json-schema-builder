import type { SchemaField } from '../types/schema';

export function generateSchema(fields: SchemaField[]): unknown {
  const out: Record<string, unknown> = {};
  fields.forEach((field) => {
    if (!field.name) return;
    switch (field.type) {
      case 'string':
        out[field.name] = 'STRING';
        break;
      case 'Select':
        out[field.name] = '';
        break;
      case 'number':
        out[field.name] = "Number";
        break;
      case 'bool':
        out[field.name] = "true/false";
        break;
      case 'nested':
        out[field.name] = generateSchema(field.children || []);
        break;
      default:
        out[field.name] = null;
    }
  });
  return out;
}
