const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const WeaponAmmunition = sequelize.define('WeaponAmmunition', {
    weaponModelID: DataTypes.INTEGER,
    ammoModelID: DataTypes.INTEGER,
    
  }, {freezeTableName: true,timestamps:false})
  
  WeaponAmmunition.removeAttribute('id')

module.exports = WeaponAmmunition;