export function buildJson(fields: any[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const field of fields) {
    const key = field?.key?.trim();
    const type = field?.type?.trim();

    // Skip if key or type is missing
    if (!key || !type) continue;

    if (type === "nested") {
      const children = buildJson(field.children || []);

      // Only add if nested has valid children
      if (Object.keys(children).length > 0) {
        result[key] = {
          type: "nested",
          children,
        };
      }
    } else {
      result[key] = type;
    }
  }

  return result;
}
