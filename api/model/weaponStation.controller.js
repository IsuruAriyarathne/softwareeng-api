const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const WeaponStation = sequelize.define('WeaponStation', {
    weaponID: DataTypes.INTEGER,
    stationID: DataTypes.INTEGER,
    assigned: DataTypes.TINYINTEGER,
    assignedDate: DataTypes.DATEONLY,
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponStation.removeAttribute('id')

module.exports = WeaponStation;