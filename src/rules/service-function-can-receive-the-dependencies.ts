import { Rule } from "eslint";
import { Node } from "estree";
import { isServiceFile } from "utils";
import { basename } from "path";
import camelCase from "lodash.camelcase";

const rule = {
  create(context: Rule.RuleContext) {
    return {
      "Program:exit": (node: Node) => {
        if (!isServiceFile(context.getFilename())) return true;
        const variables = context.getScope().childScopes[0].variables;
        const filename = basename(context.getFilename(), ".ts");
        const functionName = camelCase(filename).replace(/Service$/, "");
        const serviceVariables = variables.filter(variable => {
          return variable.name === functionName;
        });
        if (serviceVariables.length === 0) {
          context.report({
            node,
            message: "${functionName} must be defined"
          });
        } else if (serviceVariables.length >= 2) {
          context.report({
            node,
            message: "${functionName} is duplicated definition"
          });
        } else if (
          serviceVariables[0].defs[0].node.type === "FunctionDeclaration"
        ) {
          const serviceFunctionDeclaration = serviceVariables[0].defs[0].node;
          if (
            !(
              serviceFunctionDeclaration.params[0] &&
              serviceFunctionDeclaration.params[0].type === "Identifier" &&
              serviceFunctionDeclaration.params[0].name === "deps"
            )
          ) {
            context.report({
              node,
              message: `First argument of ${functionName} must be deps: Dependencies.`
            });
          }
        } else if (false) {
        } else if (
          serviceVariables[0].defs[0].type === "Variable" &&
          serviceVariables[0].defs[0].node.init &&
          (serviceVariables[0].defs[0].node.init.type ===
            "ArrowFunctionExpression" ||
            serviceVariables[0].defs[0].node.init.type === "FunctionExpression")
        ) {
          const firstParams = serviceVariables[0].defs[0].node.init.params[0];
          if (!firstParams) {
            context.report({
              node,
              message: `First argument of ${functionName} must be deps: Dependencies.`
            });
          } else if (
            !(firstParams.type === "Identifier" && firstParams.name === "deps")
          ) {
            context.report({
              node,
              message: `First argument of ${functionName} must be deps: Dependencies.`
            });
          }
        }
      }
    };
  }
};

export = rule;
