import { Handle, Position } from "@xyflow/react";
import { FcProcess } from "react-icons/fc";

export interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}
const NodeComponent: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border border-purple-600 rounded lg:p-2 shadow relative">
      <Handle type="source" position={Position.Top} id="source" />
      <div className="flex items-center justify-center">
        <FcProcess />
        <p className="text-[10px] lg:text-xs">{data.label}</p>
      </div>
      <Handle type="target" position={Position.Bottom} id="target" />
    </div>
  );
};

export default NodeComponent;
