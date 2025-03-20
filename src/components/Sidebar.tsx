import React from "react";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { FcProcess } from "react-icons/fc";
import { TbAirConditioning } from "react-icons/tb";
import { GiFinishLine } from "react-icons/gi";

const nodeTypes = [
  {
    type: "start",
    label: "Start",
    icon: <LiaHourglassStartSolid className="text-green-700" />,
  },
  { type: "process", label: "Process", icon: <FcProcess /> },
  {
    type: "decision",
    label: "Decision",
    icon: <TbAirConditioning className="text-yellow-600" />,
  },
  {
    type: "end",
    label: "End",
    icon: <GiFinishLine className="text-pink-500" />,
  },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/xyflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-20 md:w-32 lg:w-52 xl:w-60 h-screen bg-gray-200 p-4 border-r shadow-lg">
      <h2 className="text-xl font-bold mb-4">Nodes</h2>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="p-2 mb-2 bg-white border rounded cursor-grab flex items-center justify-center border-blue-500"
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          {node.icon && node.icon}
          <p className="hidden md:block">{node.label}</p>
        </div>
      ))}
    </div>
  );
}
