import { Rule } from "eslint"
import { Node } from "estree"
import { isServiceFile } from "utils"


const rule = {
  create(context: Rule.RuleContext) {
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
      ExportDefaultDeclaration(node: Node) {
        existExportDefault = true
        if(!isServiceFile(context.getFilename())) return true
        if(node.type === "ExportDefaultDeclaration" && node.declaration.type === "Identifier") {
          const parserServices = context.parserServices;
          console.dir(parserServices)
          const checker = parserServices.program.getTypeChecker();
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node)
          const type = checker.getTypeAtLocation(originalNode);
          context.report({
            node,
            message: type
          })
        }
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
