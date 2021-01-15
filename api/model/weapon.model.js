const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model');
const Order = require('./order.model');


const Weapon = sequelize.define('Weapon', {
    weaponID: {type:DataTypes.INTEGER, primaryKey:true},
    weaponModelID: {type:DataTypes.INTEGER, references: { Model: WeaponModel, key: 'weaponModelID' }},
    orderID: {type:DataTypes.INTEGER,references: { Model: Order, key: 'orderID' }},
    state: DataTypes.STRING(20),
    
  }, {freezeTableName: true,timestamps:false})
  
  Weapon.removeAttribute('id')

module.exports = Weapon;