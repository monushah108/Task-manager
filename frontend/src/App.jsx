import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const url = "http://localhost:4000";

  useEffect(() => {
    fetchTodos();
  }, []);

  const showError = (message) => {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${url}/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();

      setTodos(data.reverse());
    } catch (err) {
      showError(err.message);
    }
  };

  const addTodo = async ({ text }) => {
    try {
      const response = await fetch(`${url}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();
      console.log("Added new todo:", newTodo);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      showError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${url}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      showError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    console.log("Toggling todo with id:", id);
    try {
      const todo = todos.find((t) => t.id === id);

      const response = await fetch(`${url}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    } catch (err) {
      showError(err.message);
    }
  };

  const updateTodo = async (id, newData) => {
    try {
      const response = await fetch(`${url}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text: newData } : todo,
        ),
      );
    } catch (err) {
      showError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Todo App
          </h1>
        </header>

        <TodoForm addTodo={addTodo} />

        <main className="mt-6">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        </main>

        {error && (
          <div className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
