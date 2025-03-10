const WebSocket = require("ws");

class WebSocketManager {
  constructor() {
    if (!WebSocketManager.instance) {
      this.clients = new Set();
      WebSocketManager.instance = this;
    }
    return WebSocketManager.instance;
  }

  setup(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on("connection", (ws) => {
      this.clients.add(ws);
      ws.on("close", () => this.clients.delete(ws));
    });
  }

  broadcast(data) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}

module.exports = new WebSocketManager();
