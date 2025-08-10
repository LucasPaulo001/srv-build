export const additionalFiles: Record<string, string> = {
  ".prettierrc.json": JSON.stringify(
    {
      semi: true,
      singleQuote: true,
      trailingComma: "all",
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      bracketSpacing: true,
      arrowParens: "always",
      endOfLine: "lf",
      jsxSingleQuote: false,
    },
    null,
    2
  ),
  ".eslintrc.json": JSON.stringify(
    {
      env: {
        browser: true,
        es2024: true,
        node: true,
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint", "import"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
      ],
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              "internal",
              ["parent", "sibling", "index"],
            ],
            alphabetize: { order: "asc", caseInsensitive: true },
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "no-console": "warn",
      },
    },
    null,
    2
  ),
};
