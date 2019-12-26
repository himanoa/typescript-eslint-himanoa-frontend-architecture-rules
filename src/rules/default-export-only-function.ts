import { Rule } from "eslint"
import { Node } from "estree"
import { isServiceFile } from "utils"


const rule: Rule.RuleModule = {
  create(context) {
    let existExportDefault = false;
    return {
      "Program:exit": (node: Node) => {
        if(!isServiceFile(context.getFilename())) return true
        if(!existExportDefault) {
          context.report({
            node,
            message: "Service file must be exist default export"
          })
        }
      },
      ExportDefaultDeclaration(node) {
        existExportDefault = true
        if(!isServiceFile(context.getFilename())) return true
        if(node.type === "ExportDefaultDeclaration" && node.declaration.type !== 'FunctionDeclaration') {
          context.report({
            node,
            message: "Default export is only function in service file"
          })
        }
      }
    }
  }
}

export = rule
