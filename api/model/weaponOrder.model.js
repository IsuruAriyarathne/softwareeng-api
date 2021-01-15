const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Order = require('../config/db');


const WeaponOrder = sequelize.define('WeaponOrder', {
    weaponModelID: {type:DataTypes.INTEGER,primaryKey:true},
    orderID:{ type:DataTypes.INTEGER,primaryKey:true,references: { Model: Order, key: 'orderID' }},
    count: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    state: DataTypes.STRING(20),
    description: DataTypes.STRING(200),
  }, {freezeTableName: true,timestamps:false})
  
  WeaponOrder.removeAttribute('id')

module.exports = WeaponOrder;