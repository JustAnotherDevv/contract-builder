import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const IfNode = ({ data }) => {
  return (
    <div
      className="if-node bg-yellow-100 border-2 border-yellow-300 rounded p-2 shadow-md text-center"
      style={{ width: 150 }}
    >
      <Handle type="target" position={Position.Left} id="condition" style={{ top: "50%" }} />
      <Handle type="target" position={Position.Top} id="statement" style={{ left: "50%" }} />
      <div className="font-bold">If</div>
      <div className="text-sm">Condition</div>
      <div className="flex justify-between mt-2">
        <div className="text-xs">True</div>
        <div className="text-xs">False</div>
      </div>
      <Handle type="source" position={Position.Right} id="true" style={{ top: "70%" }} />
      <Handle type="source" position={Position.Right} id="false" style={{ top: "30%" }} />
    </div>
  );
};

export default memo(IfNode);
