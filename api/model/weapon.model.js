const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');


const Weapon = sequelize.define('Weapon', {
    weaponID: DataTypes.INTEGER,
    weaponModelID: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    state: DataTypes.STRING(20),
    
  }, {freezeTableName: true,timestamps:false})
  
  Weapon.removeAttribute('id')
Weapon.belongsTo(Order,{foreignKey:'orderID'})
module.exports = Weapon;