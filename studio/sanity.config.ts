import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "pottery-shop",
  title: "Pottery Shop",
  projectId: "3mz82grt",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
