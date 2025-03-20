import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";

const StartNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border lg:p-2 shadow relative border-green-700 rounded">
      <p className="text-[10px] lg:text-lg">{data.label}</p>
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
