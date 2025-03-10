const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
      this.connectionTryOuts = 3;
      this._connect();
      this.setEventListeners();
    }
    return Database.instance;
  }

  async _connect() {
    try {
      const mongooseConnect = await mongoose.connect(process.env.MONGO_URI);
      if (mongooseConnect) {
        console.log("MongoDB Connected Successfully");
        this.connectionTryOuts = 3;
      }
    } catch (err) {
      console.error("MongoDB Connection Error:", err);
      this.connectionTryOuts--;
      if (this.connectionTryOuts > 0) {
        setTimeout(() => this._connect(), 5000); // Retry after 5 sec
      } else {
        console.error(
          "MongoDB connection failed after multiple attempts. Exiting..."
        );
        process.exit(1); // Exit process
      }
    }
  }

  setEventListeners() {
    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB Disconnected! Retrying...");
      this.handleReconnect();
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Error:", err);
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB Reconnected!");
    });
  }
}

module.exports = new Database();
