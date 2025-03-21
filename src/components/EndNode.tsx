import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";
import { GiFinishLine } from "react-icons/gi";

const EndNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border lg:p-2 shadow relative border-pink-700 rounded">
      <Handle
        type="source"
        position={Position.Top}
        id="source"
        className="w-2 h-2 bg-blue-500"
      />
      <div className="flex items-center justify-center">
        <GiFinishLine className="text-pink-600" />
        <p className="text-[10px] lg:text-lg">{data.label}</p>
      </div>
    </div>
  );
};

export default EndNode;
