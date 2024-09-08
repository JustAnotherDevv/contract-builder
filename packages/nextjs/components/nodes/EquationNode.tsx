import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

const operators = ["==", "!=", "<", ">", "<=", ">="];

const EquationNode = ({ data, isConnectable }) => {
  const [operator, setOperator] = useState(data.operator || "==");

  return (
    <div className="equation-node bg-blue-100 border-2 border-blue-300 rounded p-2 shadow-md" style={{ width: 150 }}>
      <Handle
        type="target"
        position={Position.Left}
        id="input-1"
        style={{ top: "30%" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input-2"
        style={{ top: "70%" }}
        isConnectable={isConnectable}
      />
      <div className="font-bold text-center mb-2">Equation</div>
      <select className="w-full p-1 mb-2 border rounded" value={operator} onChange={e => setOperator(e.target.value)}>
        {operators.map(op => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
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

export default memo(EquationNode);
