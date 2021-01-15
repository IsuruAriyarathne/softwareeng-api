const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model');


const WeaponStation = sequelize.define('WeaponStation', {
    weaponID: {type:DataTypes.INTEGER, primaryKey:true,},
    stationID: {type:DataTypes.INTEGER,primaryKey:true,references:{Model:Station,key:'stationID'}},
    assigned: DataTypes.TINYINTEGER,
    assignedDate: DataTypes.DATEONLY,
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponStation.removeAttribute('id')

module.exports = WeaponStation;