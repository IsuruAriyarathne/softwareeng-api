const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const SupplyWeapon = sequelize.define('SupplyWeapon', {
    weaponModelID: DataTypes.INTEGER,
    supplierID: DataTypes.INTEGER,
    
  }, {freezeTableName: true,timestamps:false})
  
  SupplyWeapon.removeAttribute('id')

module.exports = SupplyWeapon;