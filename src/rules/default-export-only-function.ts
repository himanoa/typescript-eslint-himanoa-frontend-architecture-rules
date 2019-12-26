import { Rule } from "eslint"
import { Node } from "estree"
import { isServiceFile } from "utils"


const rule: Rule.RuleModule = {
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        if(!isServiceFile(context.getFilename())) return true
        if(node.type === "ExportDefaultDeclaration" && node.declaration.type !== 'FunctionDeclaration') {
          context.report({
            node,
            message: "default export is only function in service file"
          })
        }
      }
    }
  }
}

export = rule
