import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface FieldRowProps {
  nestIndex: number[];
  name: string;
  remove?: () => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ nestIndex, name, remove }) => {
  const { control, register, watch } = useFormContext();

  const fullPath = nestIndex.length === 0 ? name : `${name}.children`;

  const { fields, append, remove: removeChild } = useFieldArray({
    control,
    name: fullPath,
  });

  const type = watch(`${name}.type`);

  return (
    <div style={{ marginLeft: nestIndex.length * 20, marginTop: 12 }}>
 
      <input
        {...register(`${name}.key`)}
        defaultValue=""
        placeholder="Key"
        style={{ marginRight: 8 }}
      />

     
      <select
        {...register(`${name}.type`)}
        defaultValue="string"
        style={{ marginRight: 8 }}
      >
        <option value="">Select Field</option>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="nested">Nested</option>
      </select>

  
      {remove && (
        <button type="button" onClick={remove} style={{ marginRight: 8 }}>
          x
        </button>
      )}

      {/* Nested  */}
      {type === "nested" && (
        <div style={{ marginTop: 10 }}>
          {fields.map((field, index) => (
            <FieldRow
              key={field.id}
              nestIndex={[...nestIndex, index]}
              name={`${fullPath}[${index}]`}
              remove={() => removeChild(index)}
            />
          ))}

          {/* Nested Button Add */}
          <button
            type="button"
            onClick={() =>
              append({
                id: uuidv4(),
                key: "",
                type: "string",
                children: [],
              })
            }
          >
            + Add Nested
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldRow;
