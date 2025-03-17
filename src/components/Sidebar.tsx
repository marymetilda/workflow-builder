import React from "react";

const nodeTypes = [
  { type: "process", label: "Process" },
  { type: "decision", label: "Decision" },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/xyflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-60 h-screen bg-gray-200 p-4 border-r shadow-lg">
      <h2 className="text-xl font-bold mb-4">Nodes</h2>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="p-2 mb-2 bg-white border rounded cursor-grab"
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
