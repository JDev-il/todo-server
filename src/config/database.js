const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
      this.connectionTryOuts = 3;
      this._db = mongoose.connection;
      this._connect();
      this.setEventListeners();
    }
    return Database.instance;
  }

  async _connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        maxPoolSize: 10, // Allow up to 10 concurrent connections
        serverSelectionTimeoutMS: 5000,
      });
      this.connectionTryOuts = 3;
    } catch (err) {
      console.error("MongoDB Connection Error:", err.message);
      this.retryConnection();
    }
  }

  retryConnection() {
    if (this.connectionTryOuts > 0) {
      this.connectionTryOuts--;
      console.warn(
        `Retrying MongoDB connection (${this.connectionTryOuts} attempts left)...`
      );
      setTimeout(() => this._connect(), 5000); // Retry after 5 seconds
    } else {
      console.error("Could not reconnect to MongoDB. Exiting process.");
      process.exit(1);
    }
  }

  setEventListeners() {
    this._db.on("disconnected", () => {
      console.warn("MongoDB Disconnected. Attempting to reconnect...");
      this.retryConnection(); // Controlled retry
    });

    this._db.on("reconnected", () => {
      console.log("MongoDB Reconnected");
      this.connectionTryOuts = 3; // Reset retry count
    });

    this._db.on("connected", () => {
      console.log("Successfully Connected");
    });

    this._db.on("close", () => {
      console.warn("MongoDB Connection Closed.");
    });
  }
}

module.exports = new Database();
