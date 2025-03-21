import { Handle, Position } from "@xyflow/react";
import { TbAirConditioning } from "react-icons/tb";
import { NodeData } from "./NodeComponent";

const DecisionNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="border border-yellow-600 rounded p-2 shadow relative">
      <div className="flex items-center justify-center gap-2">
        <TbAirConditioning className="text-yellow-600" />
        <p className="text-[10px] lg:text-lg">{data.label}</p>
      </div>

      <Handle type="target" position={Position.Bottom} id="yes" />
      <Handle type="target" position={Position.Right} id="no" />
      <Handle type="source" position={Position.Top} id="source" />

      <span className="absolute text-[5px] lg:text-xs -right-3 lg:-right-5 top-1/2">
        Yes
      </span>

      <span className="absolute text-[5px] lg:text-xs left-1/2 top-full">
        No
      </span>
    </div>
  );
};

export default DecisionNode;
