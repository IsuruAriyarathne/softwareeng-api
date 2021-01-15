const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
    officerId: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    location: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    role: DataTypes.STRING(10),
    stationID: DataTypes.STRING(10),
  }, {freezeTableName: true,timestamps:false})
  
  User.removeAttribute('id')

module.exports = User;