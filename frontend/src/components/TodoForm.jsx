import React, { useState } from "react";

export default function TaskForm({ addTodo }) {
  const [text, setText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="  p-1.5 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity "
        aria-label="Add todo"
      >
        Add Task
      </button>
    </form>
  );
}
