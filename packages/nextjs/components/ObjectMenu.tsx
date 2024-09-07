import React, { useState } from "react";
import { Code, Edit, PlusCircle, X } from "lucide-react";
import { Controls, Panel } from "reactflow";

const ObjectMenu = ({
  onDragStart,
  onEditFunction,
  functions,
  addFunction,
  removeFunction,
  variables,
  addVariable,
  removeVariable,
  onSwitchToCodeView,
}) => {
  const [newFunctionName, setNewFunctionName] = useState("");
  const [newFunctionType, setNewFunctionType] = useState("void");
  const [newVariableName, setNewVariableName] = useState("");
  const [newVariableType, setNewVariableType] = useState("string");

  const onDragStartHandler = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleAddFunction = () => {
    if (newFunctionName.trim()) {
      addFunction(newFunctionName.trim(), newFunctionType);
      setNewFunctionName("");
      setNewFunctionType("void");
    }
  };

  const handleAddVariable = () => {
    if (newVariableName.trim()) {
      addVariable(newVariableName.trim(), newVariableType);
      setNewVariableName("");
      setNewVariableType("string");
    }
  };

  return (
    <Panel position="top-left" style={{ background: "#f8f8f8", padding: "10px", borderRadius: "5px", width: "250px" }}>
      <div className="object-menu">
        <h3 className="text-lg font-bold mb-2">Custom Nodes</h3>
        <div
          className="draggable-item bg-blue-500 text-white p-2 mb-2 rounded cursor-move"
          onDragStart={event => onDragStartHandler(event, "default")}
          draggable
        >
          Default Custom Node
        </div>
        <div
          className="draggable-item bg-green-500 text-white p-2 mb-2 rounded cursor-move"
          onDragStart={event => onDragStartHandler(event, "input")}
          draggable
        >
          Input Custom Node
        </div>
        <div
          className="draggable-item bg-red-500 text-white p-2 mb-2 rounded cursor-move"
          onDragStart={event => onDragStartHandler(event, "output")}
          draggable
        >
          Output Custom Node
        </div>
        <div
          className="draggable-item bg-purple-500 text-white p-2 mb-2 rounded cursor-move"
          onDragStart={event => onDragStartHandler(event, "counter")}
          draggable
        >
          Counter Node
        </div>

        <h3 className="text-lg font-bold mt-4 mb-2">Functions</h3>
        <div className="function-list">
          {functions.map(func => (
            <div key={func.id} className="function-item flex justify-between items-center mb-2 bg-gray-100 p-2 rounded">
              <span>{func.displayName}</span>
              <div>
                <button onClick={() => onEditFunction(func.id)} className="text-blue-500 mr-2">
                  <Edit size={18} />
                </button>
                <button onClick={() => removeFunction(func.id)} className="text-red-500">
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="add-function mt-2 flex flex-col">
          <input
            type="text"
            value={newFunctionName}
            onChange={e => setNewFunctionName(e.target.value)}
            placeholder="New function name"
            className="p-1 border border-gray-300 rounded mb-1"
          />
          <div className="flex">
            <select
              value={newFunctionType}
              onChange={e => setNewFunctionType(e.target.value)}
              className="flex-grow p-1 border border-gray-300 rounded-l"
            >
              <option value="void">Void</option>
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
            <button onClick={handleAddFunction} className="bg-green-500 text-white p-1 rounded-r">
              <PlusCircle size={24} />
            </button>
          </div>
        </div>

        <h3 className="text-lg font-bold mt-4 mb-2">Variables</h3>
        <div className="variable-list">
          {variables.map(variable => (
            <div
              key={variable.id}
              className="variable-item flex justify-between items-center mb-2 bg-gray-100 p-2 rounded"
            >
              <span>{variable.displayName}</span>
              <button onClick={() => removeVariable(variable.id)} className="text-red-500">
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="add-variable mt-2 flex flex-col">
          <input
            type="text"
            value={newVariableName}
            onChange={e => setNewVariableName(e.target.value)}
            placeholder="New variable name"
            className="p-1 border border-gray-300 rounded mb-1"
          />
          <div className="flex">
            <select
              value={newVariableType}
              onChange={e => setNewVariableType(e.target.value)}
              className="flex-grow p-1 border border-gray-300 rounded-l"
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
            <button onClick={handleAddVariable} className="bg-green-500 text-white p-1 rounded-r">
              <PlusCircle size={24} />
            </button>
          </div>
        </div>
        <button
          onClick={onSwitchToCodeView}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
        >
          <Code size={18} className="mr-2" />
          Switch to Code View
        </button>
      </div>
      {/* <Controls /> */}
    </Panel>
  );
};

export default ObjectMenu;
