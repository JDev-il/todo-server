# Node.js To-Do | Backend

A real-time To-Do List API built with Node.js, Express.js, MongoDB, and WebSockets.
It follows MVC architecture and includes Singleton & Factory Design Patterns for scalability.

## Main Features & Concepts

✅ RESTful API for CRUD operations on To-Do tasks.
✅ WebSockets for real-time updates across connected clients.
✅ MongoDB (Mongoose) as the database.
✅ Singleton Pattern for database connection.
✅ Factory Pattern for the service layer.
✅ Clean MVC structure for maintainability.

## Getting Started

### Project Initialization

1. Clone the Repository
   git clone https://github.com/YOUR_USERNAME/todo-app-server.git
   cd todo-app-server

2. Install Dependencies
   npm install

3. Install MongoDB & Atlas-CLI
   Windows (Shell) → Download from MongoDB
   macOS (Homebrew) → brew install mongosh
   Linux → Follow the MongoDB installation guide

4. Log in to MongoDB Atlas
   atlas auth login
   Get available Atlas clusters: atlas clusters list
   Retrieve your MongoDB Atlas connection string: atlas clusters connectionstrings describe YOUR_CLUSTER_NAME
   Example connection string: MONGO_URI=mongodb+srv://yourUser:yourPassword@yourCluster.mongodb.net/myDatabase?retryWrites=true&w=majority

### Configure Environment Variables

Create a .env file in the project root and add:
For Local MongoDB:
MONGO_URI=mongodb://localhost:27017/todoDB
PORT=5001

For MongoDB Atlas (Cloud Database):
MONGO_URI=mongodb+srv://yourUser:yourPassword@yourCluster.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=5001

### Project Structure

- /src
  - /config # Database connection (Singleton)
    - database.js
  - /controllers # Handles request logic
    - todo.controller.js
  - /models # Database schema
    - todo.model.js
  - /routes # API routes
    - todo.routes.js
  - /services # Business logic (Factory Pattern)
    - todo.service.js
  - /utils # WebSockets logic
    - Logger.js
    - WebSocket.js
  - app.js # Express app configuration
  - server.js # Starts HTTP & WebSocket server
- .env
- .gitignore
- LICENSE
- package.json
- README.md

## API Endpoints

| Method |      Endpoint      |       Description |
| :----- | :----------------: | ----------------: |
| GET    | **/api/todos**     |     Get all todos |
| POST   | **/api/todos**     | Create a new todo |
| PUT    | **/api/todos/:id** |     Update a todo |
| DELETE | **/api/todos/:id**     |     Delete a todo |

## WebSocket Events

| Event Type |             Description             |
| :--------- | :---------------------------------: |
| CREATE     | Broadcasts when a new task is added |
| UPDATE     | Broadcasts when a task is updated   |
| DELETE     | Broadcasts when a task is deleted   |

## Git & Version Control

Initialize Git (If Not Already Done):

git init
git add .
git commit -m "Initial commit - Node.js backend setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/todo-server.git
git push -u origin main

Pull Latest Changes:
git pull origin main


## License

This project is licensed under the MIT License.

## Running the App

Start the Server
  node src/server.js

For Local MongoDB:
  mongosh "mongodb://localhost:27017/todoDB"

For MongoDB Atlas (Cloud Database):
  mongosh "mongodb+srv://yourUser:yourPassword@yourCluster.mongodb.net/todoDB"
