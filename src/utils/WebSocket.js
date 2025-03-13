const WebSocket = require("ws");

class WebSocketManager {
  constructor() {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = this;
      this.clients = new Set();
      this.todoLocks = new Map();
    }
    return WebSocketManager.instance;
  }

  setup(server) {
    if (this.wss) {
      console.error("WebSocket server is already set up..");
      return;
    }
    this.wss = new WebSocket.Server({ server });
    console.log("WebSocket server initialized.");

    this.wss.on("connection", (ws) => {
      this.wsConnectionStatus(ws);
    });

    this.wss.on("error", (error) => {
      console.error("WebSocket Server Error:", error);
    });
  }

  handleLockTodo(todoId, clientId) {
    if (this.todoLocks.has(todoId)) {
      console.log(`Todo ${todoId} is already locked by another user.`);
      return;
    }
    this.todoLocks.set(todoId, clientId);
    this.broadcast({ type: "LOCK_TODO", todoId, clientId });
  }

  handleUnlockTodo(todoId, clientId) {
    if (this.todoLocks.get(todoId) === clientId) {
      this.todoLocks.delete(todoId);
      this.broadcast({ type: "UNLOCK_TODO", todoId });
    }
  }

  handleToggleComplete(todoId, completed) {
    this.broadcast({ type: "TOGGLE_COMPLETE", todoId, completed });
  }

  broadcast(data) {
    const message = JSON.stringify(data);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(message);
        } catch (error) {
          console.error("WebSocket broadcast error:", error.message);
        }
      }
    });
  }

  shutdown() {
    if (this.wss) {
      console.log("Shutting down WebSocket server...");
      this.clients.forEach((client) => client.terminate());
      this.wss.close();
      this.wss = null;
      this.clients.clear();
    }
  }

  wsConnectionStatus(ws) {
    console.log("New WebSocket connection established.");
    this.clients.add(ws);
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(JSON.stringify(message));
        console.log("Received WebSocket message:", data);
      } catch (error) {
        console.error("Invalid WebSocket message format:", error.message);
      }
    });
    ws.on("close", () => {
      if (this.clients.has(ws)) {
        this.clients.delete(ws);
      }
    });
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }
}

module.exports = new WebSocketManager();
