import { useFieldArray } from '../../hooks/useFieldArray';
import { FieldRenderer } from '../FieldRenderer/FieldRenderer';
import { JSONPreview } from '../JSONPreview/JSONPreview';
import { generateSchema } from '../../utils/schemaGenerator';
import type { SchemaField } from '../../types/schema';

export const SchemaBuilder: React.FC = () => {
  const { fields, add, update, remove } = useFieldArray([]);

  const handleFieldChange = (idx: number, updated: SchemaField) => {
    update(idx, updated);
  };

return (
  <div className="flex flex-row gap-10 min-w-screen justify-center min-h-screen p-8">

    {/* Left Section: Field Controls */}

    <div className="flex-[2]">
      <div className="flex flex-col min-h-screen">
        <div className="mt-4 space-y-4">

          {fields.length > 0 ? (
            fields.map((f, i) => (
              <FieldRenderer
                key={f.id}
                field={f}
                onChange={(updated) => handleFieldChange(i, updated)}
                onDelete={() => remove(i)}
                allowDelete={fields.length > 1}
              />
            ))
            
          ) : (
            <div className="mt-4 text-gray-500 italic">
              Click "Add field" to start!
            </div>
          )}

          <button
            onClick={() => add('Select')}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-100"
          >

            Add field

          </button>

        </div>
      </div>
    </div>

    {/* Right Section: JSON Preview */}
    <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-gray-50">
      <JSONPreview json={generateSchema(fields)} />
    </div>
  </div>
);


};
