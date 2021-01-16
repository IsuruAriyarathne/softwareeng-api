const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const AmmunitionType = require('./ammunitionType.model');


const WeaponAmmunition = sequelize.define('WeaponAmmunition', {
    weaponModelID: {type:DataTypes.INTEGER,primaryKey:true},
    ammoModelID: {type:DataTypes.INTEGER,primaryKey:true},
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponAmmunition.removeAttribute('id')
WeaponAmmunition.belongsTo(AmmunitionType,{foreignKey:'ammoModelID'})
module.exports = WeaponAmmunition;