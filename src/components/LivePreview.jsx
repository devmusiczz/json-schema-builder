import { useFormContext, useWatch } from "react-hook-form";
import { buildJson } from "../utils/buildJson";

const LivePreview = () => {
  const { control } = useFormContext();
  const watched = useWatch({ control, name: "schema" });

  const output = buildJson(watched?? []);

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "8px",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
      }}
    >
      <h3>Live JSON Preview</h3>
      <pre>{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
};

export default LivePreview;
