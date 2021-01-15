const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const SupplyAmmunition = sequelize.define('SupplyAmmunition', {
    ammoModelID: DataTypes.INTEGER,
    supplierID: DataTypes.INTEGER,
    
  }, {freezeTableName: true,timestamps:false})
  
  SupplyAmmunition.removeAttribute('id')

module.exports = SupplyAmmunition;