import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";
import { LiaHourglassStartSolid } from "react-icons/lia";

const StartNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border lg:p-2 shadow relative border-green-700 rounded">
      <div className="flex items-center justify-center">
        <LiaHourglassStartSolid className="text-green-700" />
        <p className="text-[10px] lg:text-lg">{data.label}</p>
      </div>
      <Handle
        type="target"
        position={Position.Bottom}
        id="target"
        className="w-2 h-2 bg-red-500"
      />
    </div>
  );
};

export default StartNode;
