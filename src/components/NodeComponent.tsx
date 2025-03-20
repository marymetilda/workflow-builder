import { Handle, Position } from "@xyflow/react";
import { FcProcess } from "react-icons/fc";

export interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}
const NodeComponent: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border border-purple-600 rounded p-2 shadow relative">
      <Handle
        type="source"
        position={Position.Top}
        id="source"
        className="w-2 h-2 bg-blue-500"
      />
      <div className="flex items-center justify-center">
        <FcProcess />
        <p className="font-bold">{data.label}</p>
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

export default NodeComponent;
