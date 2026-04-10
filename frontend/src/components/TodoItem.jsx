import { useState } from "react";
import { TrashIcon, PencilIcon, Check, X } from "lucide-react";

const TodoItem = ({ todo, deleteTodo, toggleTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());

      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.Text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };
  return (
    <div
      className={`p-4 rounded-lg border border-border group bg-card hover:border-primary/50 transition-all ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start gap-3 w-full">
        {/* Checkbox */}
        <button
          onClick={() => {
            toggleTodo(todo.id);
            console.log(todo);
          }}
          className={`flex justify-center items-center flex-shrink-0 w-5 h-5 rounded-md border transition-colors ${
            todo.completed
              ? "bg-primary border-primary"
              : "border-muted-foreground hover:border-primary"
          }`}
        >
          {todo.completed && (
            <Check className="w-4 h-4 text-primary-foreground" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 space-y-1">
          {isEditing ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Todo Text"
                className="w-full bg-transparent border-b border-primary outline-none"
              />
            </>
          ) : (
            <>
              <h2
                className={`font-medium ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </h2>

              <p
                className={`text-sm ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              ></p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1.5 rounded-md text-green-500 hover:bg-green-500/10"
              >
                <Check className="w-4 h-4" />
              </button>

              <button
                onClick={handleCancel}
                className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="p-1.5 rounded-md text-blue-500 hover:bg-blue-500/10"
              >
                <PencilIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
