import React, { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

const CounterNode = ({ data, isConnectable }) => {
  const [count, setCount] = useState(data.initialCount || 0);

  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  return (
    <div className="counter-node bg-white border-2 border-gray-300 rounded p-2 shadow-md">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="node-content flex items-center justify-between">
        <button onClick={decrement} className="bg-red-500 text-white px-2 py-1 rounded">
          -
        </button>
        <span className="mx-2 text-lg font-bold">{count}</span>
        <button onClick={increment} className="bg-green-500 text-white px-2 py-1 rounded">
          +
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

export default CounterNode;
