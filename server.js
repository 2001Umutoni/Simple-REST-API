const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: "Ange", email: "ange@example.com" },
  { id: 2, name: "Alice", email: "alice@example.com" }
];

/*
OBJECTIVE 1: Set up an Express server
*/
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Simple REST API is running"
  });
});

/*
OBJECTIVE 2: Create API routes for CRUD operations
*/

// CREATE
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    data: newUser
  });
});

// READ ALL
app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users retrieved successfully",
    data: users
  });
});

// READ ONE
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json({
    message: "User retrieved successfully",
    data: user
  });
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  users[userIndex] = { id, name, email };

  res.status(200).json({
    message: "User updated successfully",
    data: users[userIndex]
  });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users = users.filter((u) => u.id !== id);

  res.status(200).json({
    message: "User deleted successfully"
  });
});

/*
OBJECTIVE 4: Handle errors and return proper HTTP responses
*/

// Invalid route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});