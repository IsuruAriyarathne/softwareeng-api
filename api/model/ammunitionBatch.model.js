const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const AmmunitionBatch = sequelize.define('AmmunitionBatch', {
    ammoModelID: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    orderID: DataTypes.INTEGER,
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionBatch.removeAttribute('id')

module.exports = AmmunitionBatch;