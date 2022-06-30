'use strict';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from './../config/config.js';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = (__dirname + config)[env];
const db = {};

const sequelize = configPath.use_env_variable
    ? new Sequelize(process.env[configPath.use_env_variable], configPath)
    : new Sequelize(
          configPath.database,
          configPath.username,
          configPath.password,
          configPath,
      );

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js',
    )
    .forEach(file => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName =>
    db[modelName].associate ? db[modelName].associate(db) : null,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
