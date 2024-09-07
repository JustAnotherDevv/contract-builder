import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const InputGetterNode = ({ data }) => {
  const { input } = data;
  console.log(data);

  return (
    <div className="input-getter-node bg-blue-100 border-2 border-blue-300 rounded p-2 shadow-md">
      <Handle type="source" position={Position.Right} />
      <div className="node-content">
        <div className="font-bold">Get {input.name}</div>
        <div className="text-sm text-gray-500">{input.type}</div>
      </div>
    </div>
  );
};

export default memo(InputGetterNode);
