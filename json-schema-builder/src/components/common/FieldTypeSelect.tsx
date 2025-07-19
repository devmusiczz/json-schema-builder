import React from 'react';
import type { FieldType } from '../../types/schema';

interface Props {
  value: FieldType;
  onChange: (t: FieldType) => void;
}
const typeOptions: { value: FieldType, label: string }[] = [
  { value: 'Select', label: 'Select Field' },
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
  { value: 'nested', label: 'Nested' },
  { value: 'bool', label: 'Boolean' },
];

export const FieldTypeSelect: React.FC<Props> = ({ value, onChange }) => (
  <select value={value} onChange={e => onChange(e.target.value as FieldType)}>
    {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
);
