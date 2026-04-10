import express from "express";
import { Todo } from "./model/todoModel";

await connectDB();

const app = express();
const port = 4000;

app.get("/tasks", async (req, res) => {
  const allTodos = await Todo.find();

  return res.status(200).json(
    allTodos.map(({ id, title, desc, completed }) => ({
      id,
      title,
      desc,
      completed,
    })),
  );
});

app.post("/tasks", async (req, res) => {
  const { text } = await request.json();
  const data = await Todo.create({ text });

  return res.status(201).json(data);
});

app.patch("/tasks/:id", async (req, res) => {
  const todo = req.body;
  const { id } = req.params;
  const editedTodo = await Todo.findByIdAndUpdate(id, todo, {
    new: true,
  });
});
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  return new Response(null, {
    status: 204,
  });
});

app.listen(port, () => {
  console.log("running on port localhost:4000");
});
