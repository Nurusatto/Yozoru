import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  { ignores: ["dist", "build", "node_modules"] },

  {
    files: ["backend/**/*.js"],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    files: ["Frontend/**/*.{ts,tsx}", "Frontend/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module", //here
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "unused-imports": unusedImports,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
