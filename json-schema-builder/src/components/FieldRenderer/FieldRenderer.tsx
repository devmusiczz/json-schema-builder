import React from 'react';
import type { SchemaField, FieldType } from '../../types/schema';
import { FieldTypeSelect } from '../common/FieldTypeSelect';

interface Props {
  field: SchemaField;
  onChange: (f: SchemaField) => void;
  onDelete: () => void;
  allowDelete: boolean;
}

export const FieldRenderer: React.FC<Props> = ({ field, onChange, onDelete, allowDelete }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...field, name: e.target.value });
  const handleTypeChange = (type: FieldType) => {
    onChange(
      type === 'nested'
        ? { ...field, type, children: field.children || [] }
        : { ...field, type, children: undefined }
    );
  };
  const handleAddNested = () => {
    if (!field.children) return;
    onChange({
      ...field,
      children: [
        ...field.children,
        { id: Date.now().toString(), name: '', type: 'Select' , bool: true , Select: null},
      ],
    });
  };
  const handleNestedFieldChange = (idx: number, updated: SchemaField) =>
    onChange({
      ...field,
      children:
        field.children?.map((c, i) => (i === idx ? updated : c)) ?? [],
    });
  const handleDeleteNested = (idx: number) =>
    onChange({
      ...field,
      children:
        field.children?.filter((_, i) => i !== idx) ?? [],
    });

  return (
    <div style={{ borderLeft: '2px solid #ddd', marginLeft: 16, paddingLeft: 8, marginTop: 6 }}>
      <input
        placeholder="Field name"
        value={field.name}
        onChange={handleNameChange}
        style={{ marginRight: 8 }}
      />
      <FieldTypeSelect value={field.type} onChange={handleTypeChange} />
      {allowDelete && (
        <button onClick={onDelete} style={{ marginLeft: 6 }}>Delete</button>
      )}
      {field.type === 'nested' && (
        <div style={{ marginTop: 8 }}>
       
          <div>
            {field.children?.map((f, i) => (
              <FieldRenderer
                key={f.id}
                field={f}
                onChange={updated => handleNestedFieldChange(i, updated)}
                onDelete={() => handleDeleteNested(i)}
                allowDelete={true}
              />
            ))}
          </div>
             <button onClick={handleAddNested} className='w-100 m-1 p-1' type="button">Add nested field</button>
        </div>
      )}
    </div>
  );
};
