# Workflow Builder

## Overview

The **Workflow Builder** is a visual tool that allows users to create and manage workflows by dragging, dropping, and connecting nodes. Users can define different types of nodes such as decision nodes, start nodes, process nodes, and end nodes. The system enables saving, loading, and modifying workflows dynamically.

## Features

- **Drag-and-Drop Interface**: Users can drag nodes from a sidebar and place them on the workflow canvas.
- **Custom Nodes & Edges**:
  - Start, Process, Decision, and End nodes.
  - Decision nodes allow dynamic Yes/No connections.
- **Workflow Actions**:
  - Connect nodes using dynamic edges.
  - Save and load workflow states.
  - Undo and redo changes.
- **Custom Edge Labels**: Decision nodes dynamically label edges based on user connections.

## Technologies Used

- **React.js**
- **@xyflow/react** (for flow-based UI components)
- **Tailwind CSS** (for styling)
- **React Icons** (for UI elements)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/workflow-builder.git
   cd workflow-builder
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the browser and navigate to `http://localhost:3000`.

## Usage Guide

### Adding Nodes

1. Drag a node type from the **Sidebar**.
2. Drop it onto the **Workflow Canvas**.
3. The node appears at the drop location.

### Connecting Nodes

1. Click on a node's output handle (e.g., `Yes` or `No` for decision nodes).
2. Drag to another node's input handle.
3. Release to establish a connection.

### Editing Node Properties

1. Click on a node.
2. Modify its properties in the **Properties Panel**.

### Saving & Loading

- Click **Save** to store the workflow in `localStorage`.
- Click **Load** to retrieve a saved workflow.

### Undo/Redo

- Click **Undo** to revert the last action.
- Click **Redo** to restore an undone action.

## Author

Developed by **Mary Metilda**.
