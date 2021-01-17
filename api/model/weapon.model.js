const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');
const WeaponModel = require('./weaponModel.model');
const WeaponAmmunition = require('./weaponAmmo.model');


const Weapon = sequelize.define('Weapon', {
    weaponID: DataTypes.INTEGER,
    weaponModelID: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER,
    state: DataTypes.STRING(20),
    
  }, {freezeTableName: true,timestamps:false})
  
  Weapon.removeAttribute('id')
Weapon.belongsTo(Order,{foreignKey:'orderID'})
Weapon.belongsTo(WeaponModel,{foreignKey:'weaponModelID'})
// Weapon.hasMany(WeaponAmmunition,{foreignKey:'weaponModelID'})

module.exports = Weapon;