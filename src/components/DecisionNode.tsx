import { Handle, Position } from "@xyflow/react";
import { NodeData } from "./NodeComponent";

const DecisionNode: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-yellow-200 border rounded-lg p-2 shadow relative min-w-60 min-h-32">
      <p className="font-bold">{data.label}</p>
      <p className="text-xs text-gray-700">{data.description}</p>
      <Handle
        type="source"
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
      <span className="absolute text-xs left-1/2 bottom-0">No</span>
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        className="w-2 h-2 bg-blue-500"
      />
    </div>
  );
};

export default DecisionNode;
