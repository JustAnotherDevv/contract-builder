import React, { useCallback, useState } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data, isConnectable }) => {
  const [nodeName, setNodeName] = useState(data.label || "");

  const handleInputChange = useCallback(evt => {
    setNodeName(evt.target.value);
  }, []);

  return (
    <div className="custom-node bg-white border-2 border-gray-300 rounded p-2 shadow-md">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="node-content">
        <input
          type="text"
          value={nodeName}
          onChange={handleInputChange}
          className="node-input w-full p-1 border border-gray-300 rounded"
          placeholder="Enter node name"
        />
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

export default CustomNode;
