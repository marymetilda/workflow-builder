import {
  addEdge,
  Background,
  BezierEdge,
  Connection,
  Controls,
  Edge,
  Handle,
  Node,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import Header from "./Header";
import PropertiesPanel from "./PropertiesPanel";
import Sidebar from "./Sidebar";

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

const nodeTypes = {
  customNode: NodeComponent,
};

const edgeTypes = {
  default: BezierEdge,
};

interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const initialEdges: Edge[] = [];
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>(
    []
  );
  const [redoStack, setRedoStack] = useState<
    { nodes: Node[]; edges: Edge[] }[]
  >([]);

  const onConnect = useCallback(
    (connection: Connection) => {
      console.log("Connection Attempt:", connection);

      if (!connection.source || !connection.target) {
        console.error(
          "Invalid connection: Missing source or target",
          connection
        );
        return;
      }

      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const saveHistory = (newEdges?: Edge<NodeData>[]) => {
    setHistory((prev) => [...prev, { nodes, edges: newEdges ?? edges }]);
    setRedoStack([]);
  };

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
    saveHistory();
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onNodeClick = (_: unknown, node: Node<NodeData>) => {
    setSelectedNode(node);
  };

  const onSave = () => {
    localStorage.setItem("workflow", JSON.stringify({ nodes, edges }));
    alert("Workflow saved!");
  };

  const onLoad = () => {
    const savedData = localStorage.getItem("workflow");
    if (savedData) {
      const { nodes, edges } = JSON.parse(savedData) as {
        nodes: Node<NodeData>[];
        edges: Edge<NodeData>[];
      };
      setNodes(nodes);
      setEdges(edges);
    }
  };

  const onUndo = () => {
    if (history.length === 0) return;

    const lastState = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setRedoStack((prev) => [...prev, { nodes, edges }]);

    setNodes(lastState.nodes);
    setEdges(lastState.edges);
  };

  const onRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.pop();
    if (nextState) {
      setHistory((prev) => [...prev, { nodes, edges }]);
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 relative flex flex-col">
      <Header onSave={onSave} onLoad={onLoad} onUndo={onUndo} onRedo={onRedo} />

      <div className="flex flex-1">
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
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
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
    </div>
  );
};

export default WorkflowCanvas;
