import { useState, useCallback } from "react";
import PropertiesPanel from "./PropertiesPanel";
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

interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    type: "default",
    data: { label: "Start", description: "Initial node" },
    position: { x: 250, y: 5 },
  },
];

const NodeComponent: React.FC<{ data: NodeData }> = ({ data }) => {
  return (
    <div className="bg-white border rounded-lg p-2 shadow">
      <p className="font-bold">{data.label}</p>
      <p className="text-xs text-gray-500">{data.description}</p>
    </div>
  );
};

const nodeTypes = {
  customNode: NodeComponent,
};

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Handle node drop
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/xyflow");
    if (!nodeType) return;

    const position = { x: event.clientX - 100, y: event.clientY - 100 };
    const newNode: Node<NodeData> = {
      id: `${nodes.length + 1}`,
      type: "default",
      data: { label: nodeType, description: "New node" },
      position,
    };

    setNodes((nds: Node[]) => [...nds, newNode]);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeClick = (_: unknown, node: Node<NodeData>) => {
    setSelectedNode(node);
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative flex">
      {/* Sidebar */}
      <div className="w-60">
        <Sidebar />
      </div>

      <div
        className="flex-1 relative bg-gray-100"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes.map((node) => ({ ...node, type: "customNode" }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes} // Added this line
          // className="h-full"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <PropertiesPanel
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        setNodes={setNodes}
      />
    </div>
  );
};

export default WorkflowCanvas;
