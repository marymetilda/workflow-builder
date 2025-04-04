import {
  addEdge,
  Background,
  BezierEdge,
  Connection,
  Controls,
  Edge,
  EdgeProps,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import Header from "./Header";
import PropertiesPanel from "./PropertiesPanel";
import Sidebar from "./Sidebar";
import NodeComponent, { NodeData } from "./NodeComponent";
import DecisionNode from "./DecisionNode";
import CustomEdge from "./CustomEdge";
import StartNode from "./StartNode";
import EndNode from "./EndNode";

const nodeTypes = {
  customNode: NodeComponent,
  decisionNode: DecisionNode,
  startNode: StartNode,
  processNode: NodeComponent,
  endNode: EndNode,
};

const initialNodes: Node<NodeData>[] = [];
const initialEdges: Edge[] = [];

const WorkflowCanvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [history, setHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>(
    []
  );
  const [redoStack, setRedoStack] = useState<
    { nodes: Node[]; edges: Edge[] }[]
  >([]);

  const reactFlowInstance = useReactFlow();

  const edgeTypes = {
    default: BezierEdge,
    customEdge: (props: EdgeProps) => (
      <CustomEdge {...props} setEdges={setEdges} />
    ),
  };

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) {
        console.error(
          "Invalid connection: source or target missing",
          connection
        );
        return;
      }

      let label = "";

      if (connection.sourceHandle === "yes") {
        label = "Yes";
      } else if (connection.sourceHandle === "no") {
        label = "No";
      }

      const newEdge: Edge = {
        id: `${connection.source}-${connection.sourceHandle}-${connection.target}-${connection.targetHandle}`,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: "customEdge",
        data: { label },
      };

      setEdges((prevEdges) => addEdge(newEdge, prevEdges));
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

    if (!reactFlowInstance) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    let nType = "default";

    switch (nodeType) {
      case "decision":
        nType = "decisionNode";

        break;

      case "start":
        nType = "startNode";

        break;

      case "process":
        nType = "processNode";

        break;

      case "end":
        nType = "endNode";

        break;

      default:
        nType = "default";
        break;
    }

    const newNode: Node<NodeData> = {
      id: `${nodes.length + 1}`,
      type: nType,
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
      <div className="flex flex-1 relative">
        <div className="w-20 md:w-32 lg:w-52 xl:w-60">
          <Sidebar />
        </div>
        <div
          className="flex-1 relative bg-gray-100"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes.map((node) => ({ ...node, type: node.type }))}
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
          setEdges={setEdges}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setNodes={setNodes}
        />
      </div>
    </div>
  );
};

export default WorkflowCanvas;
