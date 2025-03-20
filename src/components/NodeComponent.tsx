import { Handle, Position } from "@xyflow/react";

export interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}
const NodeComponent: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border rounded-lg p-2 shadow relative">
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="w-2 h-2 bg-blue-500"
      />
      <p className="font-bold">{data.label}</p>
      <p className="text-xs text-gray-500">{data.description}</p>
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="w-2 h-2 bg-red-500"
      />
    </div>
  );
};

export default NodeComponent;
