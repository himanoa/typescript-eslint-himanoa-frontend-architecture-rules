import { Rule } from "eslint";
import { Node } from "estree";
import { isServiceFile } from "utils";

const rule = {
  create(context: Rule.RuleContext) {
    return {
      "Program:exit": (node: Node) => {
        if (!isServiceFile(context.getFilename())) return true;
        const variables = context.getScope().variables;
        console.dir(variables);
      }
    };
  }
};

export = rule;
