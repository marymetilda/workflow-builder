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
      console.log("Connection Attempt:", connection);

      if (!connection.source || !connection.target) {
        console.error(
          "Invalid connection: Missing source or target",
          connection
        );
        return;
      }

      setEdges((prevEdges) => {
        const latestNodes = nodes; // Ensure nodes are updated correctly

        const sourceNode = latestNodes.find(
          (node) => node.id === connection.source
        );
        const targetNode = latestNodes.find(
          (node) => node.id === connection.target
        );

        console.log("Source Node:", sourceNode);
        console.log("Source Handle:", connection.sourceHandle);

        let label = "";

        if (targetNode?.type === "decisionNode") {
          if (connection.targetHandle === "yes") {
            label = "Yes";
          } else if (connection.targetHandle === "no") {
            label = "No";
          }
        }

        const newEdge: Edge = {
          id: `${connection.source}-${connection.sourceHandle || "default"}-${connection.target}-${connection.targetHandle || "default"}`,
          source: connection.source,
          target: connection.target,
          type: "customEdge",
          data: { label },
          sourceHandle: connection.sourceHandle || undefined,
          targetHandle: connection.targetHandle || undefined,
        };

        console.log("New Edge Created:", newEdge);
        return addEdge(newEdge, prevEdges);
      });
    },
    [setEdges, nodes]
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
        <div className="w-20 md:w-32 lg:w-52">
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
