import { RuleTester } from "eslint"
import rule from "./default-export-only-function"

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
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
    }
  ]
})
