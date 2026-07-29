import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "ejemplos/**",
      "public/**",
      "mongo/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    rules: {
      "spaced-comment": "off",
      // Los `any` existentes son puntuales y están acotados: se avisan, no bloquean.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    // Aumentar Express.Request requiere `declare global { namespace Express }`;
    // es el idioma oficial y no tiene equivalente con módulos ES2015.
    files: ["src/middlewares/auth.middleware.ts"],
    rules: { "@typescript-eslint/no-namespace": "off" },
  },
);
