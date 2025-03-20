import { Node, Edge } from "@xyflow/react";

interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}

interface PropertiesPanelProps {
  selectedNode: Node<NodeData> | null;
  setNodes: (updater: (nds: Node<NodeData>[]) => Node<NodeData>[]) => void;
  setEdges: (updater: (eds: Edge[]) => Edge[]) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  setNodes,
  setEdges,
  setSelectedNode,
}) => {
  if (!selectedNode) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [name]: value } }
          : node
      );

      // Update selectedNode
      const updatedSelectedNode =
        updatedNodes.find((n) => n.id === selectedNode.id) || null;
      setSelectedNode(updatedSelectedNode);

      return updatedNodes;
    });
  };

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== selectedNode.id));
    setEdges((edges) =>
      edges.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  };

  return (
    <div className="p-4 border-l bg-white">
      <h3 className="text-lg font-semibold mb-2">Node Properties</h3>
      <label className="block mb-2">
        Label:
        <input
          type="text"
          name="label"
          value={selectedNode.data.label ?? ""}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      <label className="block mb-2">
        Description:
        <input
          type="text"
          name="description"
          value={selectedNode.data.description ?? ""}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full"
        />
      </label>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Node
      </button>
    </div>
  );
};

export default PropertiesPanel;
