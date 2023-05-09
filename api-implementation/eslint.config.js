export default [
    {
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "deprecation"],
      rules: {
        semi: ["error", "always"],
        quotes: [2, "single"],
        deprecation: {deprecation: "error"}
      },
      parserOptions: {
        project: ["./tsconfig.json"]
      }
    }
]
