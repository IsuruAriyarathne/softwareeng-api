const Sequelize = require('sequelize');
const config = require('../config/config');

const db = process.env.NODE_ENV == 'test' ? config.test.db:config.production.db;
const sequelize = new Sequelize(db.dbName, db.user,db.password,{
  host: db.host,
  dialect: "mysql",
  port: db.port

});

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})

module.exports = sequelize;
