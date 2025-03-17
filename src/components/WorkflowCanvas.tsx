import React, { useCallback } from "react";
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  Node,
  Background,
  Controls,
} from "@xyflow/react";
import Sidebar from "./Sidebar";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Handle node drop
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/xyflow");
    if (!nodeType) return;

    const position = { x: event.clientX - 100, y: event.clientY - 100 };
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "default",
      data: { label: nodeType },
      position,
    };

    setNodes((nds: Node[]) => [...nds, newNode]);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60">
        <Sidebar />
      </div>

      {/* Workflow Canvas */}
      <div
        className="flex-1 relative bg-gray-100"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
