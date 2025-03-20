import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";

const EndNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border lg:p-2 shadow relative border-pink-700 rounded">
      <Handle
        type="source"
        position={Position.Top}
        id="source"
        className="w-2 h-2 bg-blue-500"
      />
      <p className="text-[10px] lg:text-lg">{data.label}</p>
    </div>
  );
};

export default EndNode;
