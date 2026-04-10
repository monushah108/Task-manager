# Todo App (MERN Stack)

A simple full-stack Todo application built using the **MERN stack**.
Users can create, update, toggle completion, and delete tasks. The application demonstrates basic CRUD operations with a REST API and a responsive React frontend.

---

## Tech Stack

**Frontend**

- React
- Tailwind CSS
- Fetch API

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB
- Mongoose

**Other Tools**

- CORS
- Vite (React development environment)

---

## Features

- Add a new task
- View all tasks
- Toggle task completion
- Edit task text
- Delete tasks
- Basic input validation
- Error handling

---

## Project Structure

```
todo-app
│
├── backend
│   ├── models
│   │   └── todoModel.js
│   ├── db.js
│   └── server.js
│
├── frontend
│   ├── components
│   │   ├── TodoForm.jsx
│   │   └── TodoList.jsx
│   └── App.jsx
│
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone <repository-url>
cd todo-app
```

---

### 2. Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd frontend
npm install
```

---

## Environment Setup

Create a `.env` file inside the backend folder.

Example:

```
MONGO_URI=your_mongodb_connection_string
PORT=4000
```

---

## Run the Application

### Start Backend

```
cd backend
node server.js
```

Server will run at:

```
http://localhost:4000
```

---

### Start Frontend

```
cd frontend
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Create a task |
| PATCH  | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Assumptions

- Each task contains only:
  - `text`
  - `completed`

- Tasks are stored in MongoDB.
- The frontend assumes the backend runs on `localhost:4000`.

---

## Trade-offs

- Authentication and user accounts were not implemented to keep the project simple.
- State management libraries such as Redux were not used since the application is small.
- Optimistic UI updates were avoided to keep the code straightforward.
- Input validation is basic and handled mainly on the backend.

---

## Author

Built as a full-stack MERN practice project.
