# Task Manager

A simple full-stack task management app built with React on the frontend and Node.js/Express on the backend.

---

## Setup

You'll need Node.js v18+ and npm installed.

**Start the backend first:**

```bash
cd backend
npm install
npm start
```

This starts the API server at `http://localhost:5000`. If you want auto-reload during development, use `npm run dev` instead (requires nodemon).

**Then start the frontend in a separate terminal:**

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## What it does

- Add tasks with a title and an optional description
- Mark tasks as complete/incomplete using the checkbox
- Edit a task title inline — click the pencil icon, make your change, press Enter
- Delete tasks
- Filter between All, Pending, and Completed views
- Your selected filter is remembered across page refreshes (localStorage)
- Loading and error states are handled inline — no browser alerts

---

## API

Four endpoints, all returning `{ success, data }` or `{ success, error }`:

| Method   | Endpoint     | Description   | Body                                   |
| -------- | ------------ | ------------- | -------------------------------------- |
| `GET`    | `/tasks`     | Get all tasks | —                                      |
| `POST`   | `/tasks`     | Create a task | `{ title, description? }`              |
| `PATCH`  | `/tasks/:id` | Update a task | `{ title?, description?, completed? }` |
| `DELETE` | `/tasks/:id` | Delete a task | —                                      |

Validation: `title` is required and can't be blank. The `id` param must be a valid integer. Any unrecognized fields in a PATCH body are just ignored.

---

## Project structure

```
├── backend/
│   └── src/
│       ├── controllers/taskController.js
│       ├── routes/taskRoutes.js
│       ├── models/taskModel.js
│       ├── utils/errorHandler.js
│       ├── app.js
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── TaskForm.jsx
│       │   ├── TaskList.jsx
│       │   └── TaskItem.jsx
│       ├── services/api.js
│       ├── styles/
│       │   ├── variables.css
│       │   └── global.css
│       ├── App.jsx
│       └── main.jsx
│
└── README.md
```

The backend follows a straightforward MVC pattern — routes call controllers, controllers talk to the model, errors bubble up to a centralized middleware. Nothing clever, just easy to follow.

On the frontend, all API calls go through `services/api.js` so components don't touch axios directly. State lives in `App.jsx` and gets passed down as props.

---
