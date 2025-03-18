import React from "react";

interface HeaderProps {
  onSave: () => void;
  onLoad: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave, onLoad, onUndo, onRedo }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-lg font-bold">Workflow Builder</h1>
      <div className="flex gap-2">
        <button onClick={onSave} className="bg-green-500 px-4 py-2 rounded">
          Save
        </button>
        <button onClick={onLoad} className="bg-yellow-500 px-4 py-2 rounded">
          Load
        </button>
        <button onClick={onUndo} className="bg-gray-500 px-4 py-2 rounded">
          Undo
        </button>
        <button onClick={onRedo} className="bg-gray-500 px-4 py-2 rounded">
          Redo
        </button>
      </div>
    </header>
  );
};

export default Header;
