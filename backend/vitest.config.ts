import { defineConfig } from "vitest/config";
import tsconfig from "./tsconfig.json" with { type: "json" };

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  esbuild: {
    target: tsconfig.compilerOptions.target as string,
  },
});
