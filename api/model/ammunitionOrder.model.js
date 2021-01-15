const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const AmmunitionOrder = sequelize.define('AmmunitionOrder', {
    ammoModelID: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    state: DataTypes.STRING(20),
    description: DataTypes.STRING(200),
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionOrder.removeAttribute('id')

module.exports = AmmunitionOrder;