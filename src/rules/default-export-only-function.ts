import { Rule } from "eslint"
import { Node } from "estree"

const rule: Rule.RuleModule = {
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        if(node.type === "ExportDefaultDeclaration" && node.declaration.type !== 'FunctionDeclaration') {
          context.report({
            node,
            message: "default export is only function"
          })
        }
      }
    }
  }
}
