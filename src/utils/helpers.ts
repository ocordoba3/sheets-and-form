export function toSnakeCase(input: string) {
  return input
    .replace(/^\d+\.\s*/, "") // Remove number and point from the beginning
    .toLowerCase() // To lower case
    .replace(/\s+/g, "_"); // Replace spaces with _
}
