import { ReactFlowProvider } from "@xyflow/react";
import WorkflowCanvas from "./components/WorkflowCanvas";
import "@xyflow/react/dist/style.css";

function App() {
  return (
    <div>
      <ReactFlowProvider>
        <WorkflowCanvas />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
