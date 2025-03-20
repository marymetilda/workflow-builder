import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";

const EndNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border p-2 shadow relative border-pink-700 rounded-lg">
      <Handle
        type="source"
        position={Position.Top}
        id="source"
        className="w-2 h-2 bg-blue-500"
      />
      <p className="text-lg">{data.label}</p>
    </div>
  );
};

export default EndNode;
