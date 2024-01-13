const app = require("../app");

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_MONGODB_HOST || "localhost",
    user: process.env.DEV_DB_MONGODB_USER,
    password: process.env.DEV_DB_MONGODB_PASSWORD,
  },
};

const production = {
  app: {
    port: process.env.PRODUCTION_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRODUCTION_DB_MONGODB_HOST,
    user: process.env.PRODUCTION_DB_MONGODB_USER,
    password: process.env.PRODUCTION_DB_MONGODB_PASSWORD,
  },
};

const config = { dev, production };

const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
