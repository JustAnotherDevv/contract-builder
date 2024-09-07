import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const InputSetterNode = ({ data }) => {
  const { input } = data;

  return (
    <div className="input-setter-node bg-green-100 border-2 border-green-300 rounded p-2 shadow-md">
      <Handle type="target" position={Position.Left} />
      <div className="node-content">
        <div className="font-bold">Set {input.name}</div>
        <div className="text-sm text-gray-500">{input.type}</div>
      </div>
    </div>
  );
};

export default memo(InputSetterNode);
