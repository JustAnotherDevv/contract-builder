import React, { useCallback, useState } from "react";
import CodeView from "./CodeView";
import FunctionEditor from "./FunctionEditor";
import ObjectMenu from "./ObjectMenu";
import CounterNode from "./nodes/CounterNode";
import CustomNode from "./nodes/CustomNode";
import InputGetterNode from "./nodes/InputGetterNode";
import InputSetterNode from "./nodes/InputSetterNode";
import ReferenceNode from "./nodes/ReferenceNode";
import ReactFlow, { Background, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  custom: CustomNode,
  counter: CounterNode,
  reference: ReferenceNode,
  inputGetter: InputGetterNode,
  inputSetter: InputSetterNode,
};

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = () => `node_${id++}`;

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editingFunction, setEditingFunction] = useState(null);
  const [functions, setFunctions] = useState([]);
  const [variables, setVariables] = useState([]);
  const [functionStates, setFunctionStates] = useState({});
  const [isCodeView, setIsCodeView] = useState(false);

  const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    event => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX - 200, y: event.clientY - 40 };

      const newNode = {
        id: getId(),
        type: type === "counter" ? "counter" : "custom",
        position,
        data: { label: `New ${type} node`, initialCount: 0 },
      };

      setNodes(nds => {
        const updatedNodes = nds.concat(newNode);
        console.log("Current nodes after drop:", updatedNodes);
        return updatedNodes;
      });
    },
    [setNodes],
  );

  const onNodeDragStop = useCallback(() => {
    console.log("Current nodes after drag:", nodes);
  }, [nodes]);

  const onEditFunction = useCallback(
    id => {
      const func = functions.find(f => f.id === id);
      setEditingFunction(func);
    },
    [functions],
  );

  const onCloseFunctionEditor = useCallback((functionId, nodes, edges) => {
    setFunctionStates(prevStates => ({
      ...prevStates,
      [functionId]: { nodes, edges },
    }));
    setEditingFunction(null);
  }, []);

  const addFunction = useCallback(
    (name, type, inputs = []) => {
      if (functions.some(f => f.name === name) || variables.some(v => v.name === name)) {
        alert(`A function or variable with the name "${name}" already exists.`);
        return;
      }
      const newFunction = {
        id: Date.now(),
        name,
        type,
        displayName: `${name}: ${type}`,
        inputs,
      };
      setFunctions(prevFunctions => [...prevFunctions, newFunction]);
      setFunctionStates(prevStates => ({
        ...prevStates,
        [newFunction.id]: { nodes: [], edges: [] },
      }));
    },
    [functions, variables],
  );

  const updateFunction = useCallback((id, updatedData) => {
    setFunctions(prevFunctions =>
      prevFunctions.map(func =>
        func.id === id ? { ...func, ...updatedData, displayName: `${func.name}: ${func.type}` } : func,
      ),
    );
  }, []);

  const removeFunction = useCallback(id => {
    setFunctions(prevFunctions => prevFunctions.filter(func => func.id !== id));
    setFunctionStates(prevStates => {
      const newStates = { ...prevStates };
      delete newStates[id];
      return newStates;
    });
  }, []);

  const addVariable = useCallback(
    (name, type) => {
      if (functions.some(f => f.name === name) || variables.some(v => v.name === name)) {
        alert(`A function or variable with the name "${name}" already exists.`);
        return;
      }
      setVariables(prevVariables => [
        ...prevVariables,
        {
          id: Date.now(),
          name,
          type,
          displayName: `${name}: ${type}`,
        },
      ]);
    },
    [functions, variables],
  );

  const removeVariable = useCallback(id => {
    setVariables(prevVariables => prevVariables.filter(variable => variable.id !== id));
  }, []);

  const onSwitchToCodeView = useCallback(() => {
    setIsCodeView(true);
  }, []);

  const onSwitchToFlowView = useCallback(() => {
    setIsCodeView(false);
  }, []);

  if (isCodeView) {
    return (
      <ReactFlowProvider>
        <CodeView
          variables={variables}
          functions={functions}
          functionStates={functionStates}
          onSwitchToFlowView={onSwitchToFlowView}
        />
      </ReactFlowProvider>
    );
  }

  if (editingFunction) {
    return (
      <FunctionEditor
        functionId={editingFunction.id}
        functionName={editingFunction.name}
        functionType={editingFunction.type}
        onClose={onCloseFunctionEditor}
        variables={variables}
        functions={functions.filter(f => f.id !== editingFunction.id)}
        initialNodes={functionStates[editingFunction.id]?.nodes || []}
        initialEdges={functionStates[editingFunction.id]?.edges || []}
        updateFunction={updateFunction}
        initialInputs={editingFunction.inputs || []}
      />
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
        >
          <ObjectMenu
            onEditFunction={onEditFunction}
            functions={functions}
            addFunction={addFunction}
            removeFunction={removeFunction}
            variables={variables}
            addVariable={addVariable}
            removeVariable={removeVariable}
            onSwitchToCodeView={onSwitchToCodeView}
          />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Canvas;
