const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model');
const Weapon = require('./weapon.model');


const WeaponStation = sequelize.define('WeaponStation', {
    weaponID: {type:DataTypes.INTEGER, primaryKey:true,},
    stationID: {type:DataTypes.INTEGER,primaryKey:true},
    assigned: DataTypes.TINYINT,
    assignedDate: DataTypes.DATEONLY,
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponStation.removeAttribute('id')
  WeaponStation.hasOne(Weapon, { foreignKey: 'weaponID' });
WeaponStation.belongsTo(Station,{foreignKey:'stationID'})
module.exports = WeaponStation;