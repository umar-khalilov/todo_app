'use strict';
require('dotenv').config();
const { readdirSync } = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const enVariables = require(__dirname + './../config/config.js')[env];
const db = {};

const sequelize = enVariables.use_env_variable
    ? new Sequelize(process.env[enVariables.use_env_variable], enVariables)
    : new Sequelize(
          enVariables.database,
          enVariables.username,
          enVariables.password,
          enVariables,
      );
// sequelize
//     .authenticate()
//     .then(() => console.info('Connection has been established successfully!'))
//     .catch(err => console.error('Unable to connect to the database:', err));

readdirSync(__dirname)
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

module.exports = db;
