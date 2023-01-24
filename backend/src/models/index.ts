"use strict";

import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
// when using import instead of require I have an error:
/* 
this line:
sequelize = new Sequelize(_env[config.use_env_variable], config);
gives me: This expression is not constructable.
*/
const Sequelize = require("sequelize");
import { env as _env } from "process";
const basename = _basename(__filename);
const env = _env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.ts")[env];
const db: { [key: string]: any } = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach(file => {
    const model = require(join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
