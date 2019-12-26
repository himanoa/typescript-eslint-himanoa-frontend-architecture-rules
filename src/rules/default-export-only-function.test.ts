import { RuleTester } from "eslint"
import rule from "./default-export-only-function"

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    jsx: true,
  },
})

tester.run('default-export-only-function', rule, {
  valid: [
    {
      filename: "foobar.ts",
      code: `function() {}`
    },
    {
      filename: "foobar-service.ts",
      code: `export default function() {}`
    },
  ],
  invalid: [
    {
      filename: "foobar-service.ts",
      code: `function() {}`,
      errors: [{
        message: "service file default export is only function"
      }]
    }
  ]
})
