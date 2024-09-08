export function generateSolidityCode(name, publicVariables, functions) {
  let code = `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
  
  contract ${name} {
  `;

  // Generate public variables
  publicVariables.forEach(variable => {
    code += `    ${variable.type} public ${variable.name};\n`;
  });

  code += "\n";

  // Generate constructor
  code += `    constructor(${publicVariables.map(v => `${v.type} _${v.name}`).join(", ")}) {
  ${publicVariables.map(v => `        ${v.name} = _${v.name};`).join("\n")}
      }\n\n`;

  // Generate functions
  functions.forEach(func => {
    const inputParams = func.inputs.map(input => `${input.type} ${input.name}`).join(", ");
    const returnType = func.type !== "void" ? ` returns (${func.type})` : "";

    code += `    function ${func.name}(${inputParams}) public${returnType} {
          // TODO: Implement function logic
      }\n\n`;
  });

  code += "}";

  return code;
}
