import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";
import { TbAirConditioning } from "react-icons/tb";

const DecisionNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="border border-yellow-600 rounded p-2 shadow relative">
      <div className="flex items-center justify-center gap-2">
        <TbAirConditioning className="text-yellow-600" />
        <p className="text-lg">{data.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Top}
        id="target"
        className="w-2 h-2 bg-blue-500"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="yes"
        className="w-2 h-2 bg-green-500"
      />
      <span className="absolute text-xs -right-5 top-1/2">Yes</span>
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="w-2 h-2 bg-red-500"
      />
      <span className="absolute text-xs left-1/2 top-full">No</span>
    </div>
  );
};

export default DecisionNode;
