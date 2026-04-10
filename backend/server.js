import express from "express";
import Todo from "./models/todoModel.js";
import { connectDB } from "./db.js";
import cors from "cors";

await connectDB();

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTodos = await Todo.find();

    return res.status(200).json(
      allTodos.map(({ _id, text, completed }) => ({
        id: _id,
        text,

        completed,
      })),
    );
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// CREATE task
app.post("/tasks", async (req, res) => {
  try {
    const { text } = req.body;
    console.log(req.body.text);

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is required" });
    }

    const todo = await Todo.create({
      text,
      completed: false,
    });

    return res.status(201).json({
      id: todo._id,
      text: todo.text,
      completed: todo.completed,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// UPDATE task
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    if (text && text.trim() === "") {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const updated = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(204).json({ msg: "deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
