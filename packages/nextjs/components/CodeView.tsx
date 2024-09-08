import React, { useEffect, useState } from "react";
import { generateSolidityCode } from "../utils/codeGeneration";
import ReactFlow, { Background, Panel } from "reactflow";

const CodeView = ({ variables, functions, functionStates, onSwitchToFlowView }) => {
  const [solidityCode, setSolidityCode] = useState("");

  useEffect(() => {
    console.log("Public Variables:", variables);
    console.log("Public Functions:", functions);

    functions.forEach(func => {
      console.log(`Function: ${func.name}`);
      console.log("Inputs:", func.inputs);
      const connectedNodes = getConnectedNodes(func.id, functionStates[func.id]?.nodes || []);
      console.log("Connected Nodes:", connectedNodes);
    });

    const generatedCode = generateSolidityCode("MyContract", variables, functions);
    setSolidityCode(generatedCode);
  }, [variables, functions, functionStates]);

  const getConnectedNodes = (functionId, nodes) => {
    return nodes.filter(
      node => node.type === "inputGetter" || node.type === "inputSetter" || node.type === "reference",
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow>
        <Panel
          position="top-left"
          style={{
            background: "#f8f8f8",
            padding: "10px",
            borderRadius: "5px",
            width: "80%",
            maxWidth: "800px",
            height: "80%",
            overflow: "auto",
          }}
        >
          <h2 className="text-xl font-bold mb-4">Code View</h2>
          <p className="mb-4">Generated Solidity Code:</p>
          <pre className="bg-gray-100 p-4 rounded overflow-auto" style={{ maxHeight: "calc(100% - 100px)" }}>
            <code>{solidityCode}</code>
          </pre>
          <button onClick={onSwitchToFlowView} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
            Switch to Flow View
          </button>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default CodeView;
