import React, { useCallback, useEffect, useState } from "react";
import CounterNode from "./nodes/CounterNode";
import CustomNode from "./nodes/CustomNode";
import EquationNode from "./nodes/EquationNode";
import IfNode from "./nodes/IfNode";
import InputGetterNode from "./nodes/InputGetterNode";
import InputSetterNode from "./nodes/InputSetterNode";
import ReferenceNode from "./nodes/ReferenceNode";
import { PlusCircle, X } from "lucide-react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  custom: CustomNode,
  counter: CounterNode,
  reference: ReferenceNode,
  inputGetter: InputGetterNode,
  inputSetter: InputSetterNode,
  if: IfNode,
};

const FunctionEditor = ({
  functionId,
  functionName,
  functionType,
  onClose,
  variables,
  functions,
  initialNodes,
  initialEdges,
  updateFunction,
  initialInputs = [],
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputs, setInputs] = useState(initialInputs);
  const [newInputName, setNewInputName] = useState("");
  const [newInputType, setNewInputType] = useState("string");

  useEffect(() => {
    setInputs(initialInputs);
  }, [initialInputs]);

  const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    event => {
      event.preventDefault();

      console.log(event);

      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX - 200, y: event.clientY - 40 };

      //   const newNode = {
      //     id: `${type}-${nodes.length + 1}`,
      //     type,
      //     position,
      //     data: { label: `New ${type} node` },
      //   };

      let newNode;
      if (type === "inputGetter" || type === "inputSetter") {
        const inputData = JSON.parse(event.dataTransfer.getData("node/data") || "{}");

        newNode = {
          id: `${type}-${nodes.length + 1}`,
          type,
          position,
          data: { input: inputData.input },
        };
      } else {
        newNode = {
          id: `${type}-${nodes.length + 1}`,
          type,
          position,
          data: { label: `New ${type} node` },
        };
      }

      setNodes(nds => nds.concat(newNode));
    },
    [nodes, setNodes],
  );

  const onDragStart = (event, nodeType, data) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("node/data", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };

  const addInput = useCallback(() => {
    if (newInputName && newInputType) {
      const newInput = { name: newInputName, type: newInputType };
      setInputs(prevInputs => [...prevInputs, newInput]);
      setNewInputName("");
      setNewInputType("string");
    }
  }, [newInputName, newInputType]);

  const removeInput = useCallback(index => {
    setInputs(prevInputs => prevInputs.filter((_, i) => i !== index));
  }, []);

  //   const addGetterNode = useCallback(
  //     variable => {
  //       const newNode = {
  //         id: `input-${nodes.length + 1}`,
  //         type: "inputGetter",
  //         position: { x: 100, y: 100 },
  //         data: { name: variable.name, type: variable.type },
  //       };
  //       setNodes(nds => nds.concat(newNode));
  //     },
  //     [nodes, setNodes],
  //   );

  const addVariableNode = useCallback(
    variable => {
      const newNode = {
        id: `variable-${nodes.length + 1}`,
        type: "reference",
        position: { x: 100, y: 100 },
        data: { name: variable.name, type: variable.type, inputs: [] },
      };
      setNodes(nds => nds.concat(newNode));
    },
    [nodes, setNodes],
  );

  const addFunctionNode = useCallback(
    func => {
      const newNode = {
        id: `function-${nodes.length + 1}`,
        type: "reference",
        position: { x: 100, y: 100 },
        data: {
          name: func.name,
          type: func.type,
          inputs: func.inputs || [],
        },
      };
      setNodes(nds => nds.concat(newNode));
    },
    [nodes, setNodes],
  );

  const handleClose = useCallback(() => {
    updateFunction(functionId, { inputs });
    onClose(functionId, nodes, edges);
  }, [functionId, nodes, edges, onClose, updateFunction, inputs]);

  return (
    <div className="function-editor" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
        >
          <Panel
            position="top-left"
            style={{ background: "#f8f8f8", padding: "10px", borderRadius: "5px", width: "250px" }}
          >
            <div className="function-menu">
              <h2 className="text-xl font-bold mb-4">
                Function: {functionName}: {functionType}
              </h2>

              <h3 className="text-lg font-bold mb-2">Inputs</h3>
              <div className="input-list mb-2">
                {inputs.map((input, index) => (
                  <div
                    key={index}
                    className="input-item flex justify-between items-center mb-1 bg-gray-100 p-1 rounded"
                  >
                    <span>
                      {input.name}: {input.type}
                    </span>
                    <div>
                      <button
                        className="text-blue-500 mr-1"
                        onDragStart={event => onDragStart(event, "inputGetter", { input })}
                        // onClick={() => addGetterNode(input)}
                        draggable
                      >
                        Get
                      </button>
                      {/* <button
                        className="text-green-500 mr-1"
                        // onClick={() => addGetterNode(input)}
                        onDragStart={event => onDragStart(event, "inputSetter", { input })}
                        draggable
                      >
                        Set
                      </button> */}
                      <button onClick={() => removeInput(index)} className="text-red-500">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add-input flex flex-col mb-4">
                <input
                  type="text"
                  value={newInputName}
                  onChange={e => setNewInputName(e.target.value)}
                  placeholder="Input name"
                  className="p-1 border border-gray-300 rounded mb-1"
                />
                <div className="flex">
                  <select
                    value={newInputType}
                    onChange={e => setNewInputType(e.target.value)}
                    className="flex-grow p-1 border border-gray-300 rounded-l"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                  <button onClick={addInput} className="bg-green-500 text-white p-1 rounded-r">
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-2">Custom Nodes</h3>
              <div
                className="draggable-item bg-blue-500 text-white p-2 mb-2 rounded cursor-move"
                onDragStart={event => onDragStart(event, "custom")}
                draggable
              >
                Custom Node
              </div>
              <div
                className="draggable-item bg-purple-500 text-white p-2 mb-2 rounded cursor-move"
                onDragStart={event => onDragStart(event, "counter")}
                draggable
              >
                Counter Node
              </div>

              <div
                className="draggable-item bg-yellow-500 text-white p-2 mb-2 rounded cursor-move"
                onDragStart={event => onDragStart(event, "if")}
                draggable
              >
                If Node
              </div>

              <div
                className="draggable-item bg-blue-500 text-white p-2 mb-2 rounded cursor-move"
                onDragStart={event => onDragStart(event, "equation")}
                draggable
              >
                Equation Node
              </div>

              <h3 className="text-lg font-bold mt-4 mb-2">Variables</h3>
              <div className="variable-list">
                {variables.map(variable => (
                  <div
                    key={variable.id}
                    className="variable-item flex justify-between items-center mb-2 bg-gray-100 p-2 rounded"
                  >
                    <span>{variable.displayName}</span>
                    <button onClick={() => addVariableNode(variable)} className="text-green-500">
                      <PlusCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold mt-4 mb-2">Functions</h3>
              <div className="function-list">
                {functions.map(func => (
                  <div
                    key={func.id}
                    className="function-item flex justify-between items-center mb-2 bg-gray-100 p-2 rounded"
                  >
                    <span>{func.displayName}</span>
                    <button onClick={() => addFunctionNode(func)} className="text-green-500">
                      <PlusCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={handleClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
                Save and Close
              </button>
            </div>
          </Panel>
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FunctionEditor;
