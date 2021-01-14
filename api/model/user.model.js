const Sequelize = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
    officerId: Sequelize.STRING,
    name: Sequelize.TEXT,
    location: Sequelize.TEXT,
    password: Sequelize.TEXT,
    role: Sequelize.TEXT,
    stationID: Sequelize.TEXT,
  }, {freezeTableName: true,timestamps:false})
  
  User. removeAttribute('id')

module.exports = User;