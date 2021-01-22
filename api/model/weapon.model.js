const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');
const WeaponModel = require('./weaponModel.model');
// const WeaponAmmunition = require('./weaponAmmo.model');
// const WeaponStation = require('./weaponStation.model');


const Weapon = sequelize.define('Weapon', {
    weaponID: {type:DataTypes.INTEGER,primaryKey:true, autoIncrement: true,},
    weaponModelID: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER,
    state: DataTypes.STRING(20),
    
  }, {freezeTableName: true,timestamps:false})
  
  Weapon.removeAttribute('id')
Weapon.belongsTo(Order,{foreignKey:'orderID'})
Weapon.belongsTo(WeaponModel,{foreignKey:'weaponModelID'})

module.exports = Weapon;