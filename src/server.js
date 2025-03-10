const http = require("http");
const app = require("./app");
const WebSocketManager = require("./utils/WebSocket");

const server = http.createServer(app);

WebSocketManager.setup(server);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
