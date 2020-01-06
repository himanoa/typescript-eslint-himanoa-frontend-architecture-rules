import { RuleTester } from "eslint"
import rule from "./default-export-only-function"
import path from "path"

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  tsConfigRootDir: path.join(__dirname, '__fixtures__'),
  project: "./tsconfig.json",
  parserOptions: {
    ecmaVersion: 2015,
    jsx: true,
  },
})

tester.run('default-export-only-function', rule, {
  valid: [
    {
      filename: "foobar.ts",
      code: `function foobar() {}`
    },
    {
      filename: "foobar-service.ts",
      code: `export default function() {}`
    },
  ],
  invalid: [
    {
      filename: "foobar-service.ts",
      code: `function foobar() {}`,
      errors: [{
        message: "Service file must be exist default export"
      }]
    },
    {
      filename: "foobar-service.ts",
      code: `export default {}`,
      errors: [{
        message: "Default export is only function in service file"
      }]
    },
    {
      filename: "foobar-service.ts",
      code: `function foo() {}; export default foo`,
      errors: [{
        message: "A"
      }]
    }
  ]
})
