require("dotenv").config(); // this is important!

import { Sequelize } from "sequelize";

const database = process.env.PG_DATABASE;
const user = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;

let db: Sequelize;

if (database && user && password && host) {
  db = new Sequelize(database, user, password, {
    host,
    dialect: "postgres",
  });
} else {
  throw new Error("Missing environment variables");
}

export default db;
