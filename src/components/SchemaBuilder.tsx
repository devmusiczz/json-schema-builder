import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import FieldRow from "./FieldRow";
import { v4 as uuidv4 } from "uuid";
import LivePreview from "./LivePreview";

interface Field {
  id: string;
  key: string;
  type?: string;
  children?: Field[];
}

interface FormSchema {
  schema: Field[];
}

const SchemaBuilder: React.FC = () => {
  const methods = useForm<FormSchema>({
    defaultValues: {
      schema: [],
    },
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schema",
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Submitted:", data);
  };

  return (
    <FormProvider {...methods}>
      <div style={{ display: "flex", gap: "40px" }}>
        {/* Left */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
          {fields.map((field, index) => (
            <FieldRow
              key={field.id}
              nestIndex={[]}
              name={`schema[${index}]`}
              remove={() => remove(index)}
            />
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                id: uuidv4(),
                key: "",
                type: undefined,
                children: [],
              })
            }
            style={{ marginTop: 10 }}
          >
            + Add Item
          </button>

          <button type="submit" style={{ marginTop: 20 }}>
            Submit
          </button>
        </form>

        {/* Right */}
        <LivePreview />
      </div>
    </FormProvider>
  );
};

export default SchemaBuilder;
