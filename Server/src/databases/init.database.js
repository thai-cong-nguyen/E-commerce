"use strict";

const mongoose = require("mongoose");
const { PrismaClient } = require("@prisma/client");
const configMongodb = require("../configs/config.mongodb");

const MONGODB_CONNECTION_STRING = `mongodb+srv://${configMongodb.db.user}:${configMongodb.db.password}@${configMongodb.db.host}/?retryWrites=true&w=majority`;

// Strategy Pattern for connecting to Database
class Database {
  constructor(type = "mongodb") {
    this.connect(type);
  }
  // Connect Function
  connect(type) {
    switch (type) {
      case "mongodb":
        mongoose
          .connect(MONGODB_CONNECTION_STRING, {
            maxPoolSize: process.env.MAX_POOL_SIZE,
          })
          .then((_) => console.log("Connected to MongoDB Successfully"))
          .catch((error) =>
            console.error(`Error connecting to MongoDB: ${error.message}`)
          );
        break;
      case "postgresql":
        const prisma = new PrismaClient();
        prisma
          .connect()
          .then((_) => console.log("Connected to PostgreSQL Successfully"))
          .catch((error) =>
            console.error(`Error connecting to PostgreSQL: ${error.message}`)
          );
        break;
      default:
        console.error("Type of Database is not supported");
        this.connect();
        break;
    }
  }

  static getInstance(type) {
    if (!Database.instance) {
      Database.instance = new Database(type);
    }
    return Database.instance;
  }
}

const instanceDatabase = (type) => {
  Database.getInstance(type);
};

module.exports = instanceDatabase;
