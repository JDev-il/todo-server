const http = require("http");
const app = require("./app");
const WebSocketManager = require("./utils/WebSocket");

const server = http.createServer(app);

WebSocketManager.setup(server);

const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});