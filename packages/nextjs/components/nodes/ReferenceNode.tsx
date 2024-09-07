import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const ReferenceNode = ({ data, isConnectable }) => {
  return (
    <div className="reference-node bg-white border-2 border-gray-300 rounded p-2 shadow-md">
      <div className="node-content">
        <div className="font-bold">{data.name}</div>
        <div className="text-sm text-gray-500">{data.type}</div>
      </div>
      {data.inputs &&
        data.inputs.map((input, index) => (
          <Handle
            key={index}
            type="target"
            position={Position.Left}
            id={`input-${index}`}
            style={{ top: `${(index + 1) * 25}px` }}
            isConnectable={isConnectable}
          >
            <div
              className="input-label absolute left-[-80px] bg-gray-100 p-1 rounded text-xs hidden group-hover:block"
              style={{ width: "70px", textAlign: "right" }}
            >
              {input.name}: {input.type}
            </div>
          </Handle>
        ))}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ top: "50%" }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ReferenceNode);
