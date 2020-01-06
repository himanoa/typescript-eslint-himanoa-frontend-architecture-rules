import { RuleTester } from "eslint"
import rule from "./default-export-only-function"
import path from "path"

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2015,
    tsconfigRootDir: path.join(process.cwd(), 'src/rules/__fixtures__'),
    createDefaultProgram: true,
    sourceType: "module"
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
    {
      filename: "foobar-service.ts",
      code: `function foo() {}; export default foo`,
    },
    {
      filename: "foobar-service.ts",
      code: `const foo = () => {}; export default foo`,
    },
    {
      filename: "foobar-service.ts",
      code: `const foo = function() {}; export default foo`,
    },
    {
      filename: "foobar-service.ts",
      code: `import foobar from "asdasd"; export default foobar`,
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
      code: `const foo = 12; export default foo`,
      errors: [{
        message: "Default export is only function in service file"
      }]
    },
  ]
})
