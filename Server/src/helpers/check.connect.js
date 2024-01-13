"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// Count connect
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

// Check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    console.log(
      "-------------------Track Connections of Database-------------------"
    );

    console.log(`\tActive connections: ${numConnections}`);

    console.log(`\tCore CPU usage: ${numCores}`);

    console.log(`\tMemory usage: ${memoryUsage / 1024 / 1024} MB`);

    const maxConnections = 1000;

    if (maxConnections < numConnections) {
      console.log("\tConnection overload detected");
      // send notify to dev for repairing
    }
  }, _SECONDS);
};

module.exports = {
  countConnect,
  checkOverLoad,
};
