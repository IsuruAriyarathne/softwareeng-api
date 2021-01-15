const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const WeaponOrder = sequelize.define('WeaponOrder', {
    weaponModelID: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    state: DataTypes.STRING(20),
    description: DataTypes.STRING(200),
  }, {freezeTableName: true,timestamps:false})
  
  WeaponOrder.removeAttribute('id')

module.exports = WeaponOrder;