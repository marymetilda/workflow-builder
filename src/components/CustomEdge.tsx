import { EdgeProps, BaseEdge, getBezierPath, Edge } from "@xyflow/react";

interface CustomEdgeProps extends EdgeProps {
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void;
}

const CustomEdge: React.FC<CustomEdgeProps> = (props) => {
  const { id, sourceX, sourceY, targetX, targetY, setEdges, data } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const label = typeof data?.label === "string" ? data.label : "";

  const handleDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} />
      {label && (
        <foreignObject x={labelX - 10} y={labelY - 30} width={40} height={20}>
          <div className="text-xs text-pink-500 p-1 rounded">{label}</div>
        </foreignObject>
      )}

      <foreignObject x={labelX - 10} y={labelY - 10} width={20} height={20}>
        <button onClick={handleDelete} className="text-red-700 text-xs p-1">
          X
        </button>
      </foreignObject>
    </>
  );
};

export default CustomEdge;
