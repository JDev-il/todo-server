# Node.js To-Do | Backend
This Node.js backend provides a real-time To-Do List API using Express.js, MongoDB, and WebSockets.
It follows MVC architecture and includes Singleton & Factory Design Patterns for scalability.

## Main Features & Concepts
-- RESTful API for CRUD operations on To-Do tasks.
-- WebSockets for real-time updates across connected clients.
-- MongoDB (Mongoose) as the database.
-- Singleton Pattern for database connection.
-- Factory Pattern for the service layer.
-- Clean MVC structure for maintainability.

---

## Getting Started
### Project Initialization

1. Clone the Repository
  git clone https://github.com/YOUR_USERNAME/todo-app-server.git
  cd todo-app-server

2. Install Dependencies
  npm install


## Configure Environment Variables
Create a .env file in the project root and add:
  MONGO_URI=mongodb://localhost:27017/todoDB
  PORT=5001


### Project Structure
/todo-server
│── /src
│   ├── /config          # Database connection (Singleton)
│   │   ├── database.js
│   ├── /controllers     # Handles request logic
│   │   ├── todo.controller.js
│   ├── /models          # Database schema
│   │   ├── todo.model.js
│   ├── /routes          # API routes
│   │   ├── todo.routes.js
│   ├── /services        # Business logic (Factory Pattern)
│   │   ├── todo.service.js
│   ├── /utils           # WebSockets logic
│       ├── Logger.js
│   │   ├── WebSocket.js
│   ├── app.js           # Express app configuration
│   ├── server.js        # Starts HTTP & WebSocket server
│── .env
│── .gitignore
│── LICENSE
│── package.json
│── README.md

#### app.js → Initializes Express, middleware, and routes.
#### server.js → Starts the HTTP & WebSocket server.
#### database.js → Singleton for MongoDB connection.
#### WebSocket.js → Handles real-time updates.
#### todo.service.js → Factory Pattern for service layer.


## Run the Application
For Development:
  npm start

For Production:
node src/server.js


## API Endpoints
To-Do Routes:
Method:     Endpoint:        Description
GET	        /api/todos       Get all todos
POST	      /api/todos       Create a new todo
PUT	        /api/todos/:id   Update a todo
DELETE	    /api/todos/:id   Get all todos


WebSocket Events:
Event Type:   Description:
CREATE	      Broadcasts when a new task is added
UPDATE	      Broadcasts when a task is updated
DELETE	      Broadcasts when a task is deleted

---

## WebSocket Client Example
To test real-time updates, connect a WebSocket client:

const socket = new WebSocket('ws://localhost:5000');
socket.onmessage = (event) => {
    console.log('Received update:', JSON.parse(event.data));
};


## Git & Version Control
### Initialize Git (If Not Already Done)
git init
git add .
git commit -m "Initial commit - Node.js backend setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/todo-app-server.git
git push -u origin main