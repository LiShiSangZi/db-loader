'use strict';

const glob = require('glob');
const Sequelize = require('sequelize');
const path = require('path');


function loader(dir, appName, config) {
  const db = {};

  const mysql = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false
  });

  const files = glob.sync('**/*.js', {
    cwd: dir,
    ignore: ['node_modules/**/*.js'],
  });
  files.forEach(file => {
    let model = mysql.import(path.join(dir, file));
    db[module.name] = model;
  });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate !== undefined) {
      db[modelName].associate(db);
    }
  });
  db.mysql = mysql;
  mysql.sync().then(() => {
    console.log(`${appName} mysql sync done!`);
  }).catch(err => {
    console.log(`${appName} mysql sync error`, err);
  });

  return db;
}

module.exports = loader;
