const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const AmmunitionBatch = sequelize.define('AmmunitionBatch', {
    orderID: DataTypes.INTEGER,
    supplierID: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    totalCost: DataTypes.FLOAT,
    state: DataTypes.STRING(20),
    description: DataTypes.STRING(200),
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionBatch.removeAttribute('id')

module.exports = AmmunitionBatch;