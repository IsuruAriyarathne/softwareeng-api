const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const WeaponModel = sequelize.define('WeaponModel', {
    weaponModelID: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(100),
  }, {freezeTableName: true,timestamps:false})
  
  WeaponModel.removeAttribute('id')

module.exports = WeaponModel;