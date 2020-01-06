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
            const name = node.declaration.name
            const variables = context.getScope().variables.filter(v => v.name === name)
            if(variables.length === 0) {
              context.report({
                node,
                message: "${node.declaration.name} is not defined"
              })
            } else if(variables.length >= 2) {
              context.report({
                node,
                message: "${node.declaration.name} is duplicated definition"
              })
            }
            const variableNode = variables[0].defs[0]
            switch(variableNode.type) {
              case "Variable":
                if(variableNode.node.init && (variableNode.node.init.type === 'ArrowFunctionExpression' || variableNode.node.init.type === 'FunctionExpression')) {
                return 
              } else {
                context.report({
                  node,
                  message: "Default export is only function in service file"
                })
              }
              case "FunctionName":
                return
              default:
                return
            }
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
