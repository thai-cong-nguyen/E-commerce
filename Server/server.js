const app = require("./src/app");

const PORT = 3000 || process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Server is shutting ..."));
  // sending notify
});
