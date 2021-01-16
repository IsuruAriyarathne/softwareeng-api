const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Weapon = require('./weapon.model');


const WeaponStation = sequelize.define('WeaponStation', {
    weaponID: {type:DataTypes.INTEGER, primaryKey:true,},
    stationID: {type:DataTypes.INTEGER,primaryKey:true},
    assigned: DataTypes.TINYINT,
    assignedDate: DataTypes.DATEONLY,
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponStation.removeAttribute('id')
  WeaponStation.hasMany(Weapon, { foreignKey: 'weaponID' });

module.exports = WeaponStation;