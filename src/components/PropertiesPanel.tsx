import { Node } from "@xyflow/react";

interface NodeData extends Record<string, unknown> {
  label?: string;
  description?: string;
}

interface PropertiesPanelProps {
  selectedNode: Node<NodeData> | null;
  setNodes: (updater: (nds: Node<NodeData>[]) => Node<NodeData>[]) => void;
  setSelectedNode: (node: Node<NodeData> | null) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedNode,
  setNodes,
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

  return (
    <div className="absolute right-4 top-4 bg-white p-4 shadow-lg rounded-lg w-60">
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
    </div>
  );
};

export default PropertiesPanel;
