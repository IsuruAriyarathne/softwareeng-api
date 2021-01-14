const Sequelize = require('sequelize');

const path = 'mysql://TMeU6ua5df:kp69GbxwjU@remotemysql.com:3306/TMeU6ua5df';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})

module.exports = sequelize;
