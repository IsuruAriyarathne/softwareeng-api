const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model');
const AmmunitionType = require('./ammunitionType.model');


const WeaponAmmunition = sequelize.define('WeaponAmmunition', {
    weaponModelID: {type:DataTypes.INTEGER,primaryKey:true, references: { Model: WeaponModel, key: 'weaponModelID' }},
    ammoModelID: {type:DataTypes.INTEGER,primaryKey:true, references: { Model: AmmunitionType, key: 'ammoModelID' }},
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponAmmunition.removeAttribute('id')

module.exports = WeaponAmmunition;