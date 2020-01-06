import { RuleTester } from "eslint";
import rule from "./service-function-can-receive-the-dependencies";
import path from "path";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2015,
    createDefaultProgram: true,
    sourceType: "module"
  }
});

tester.run("default-export-only-function", rule, {
  valid: [
    {
      filename: "foobar.ts",
      code: `function foobar() {}`
    },
    {
      filename: "foobar-service.ts",
      code: `export function foobar(deps: Dependencies): any {}`
    },
    {
      filename: "foobar-service.ts",
      code: `export const foobar = (deps: Dependencies) => () => {}`
    }
  ],
  invalid: [
    {
      filename: "foobar-service.ts",
      code: `export function foobar() {}`,
      errors: [
        {
          message: "First argument of foobar must be deps: Dependencies."
        }
      ]
    },
    {
      filename: "foobar-service.ts",
      code: `export const foobar = () => {}`,
      errors: [
        {
          message: "First argument of foobar must be deps: Dependencies."
        }
      ]
    },
    {
      filename: "foobar-service.ts",
      code: `export const foobar = function() {}`,
      errors: [
        {
          message: "First argument of foobar must be deps: Dependencies."
        }
      ]
    }
  ]
});
