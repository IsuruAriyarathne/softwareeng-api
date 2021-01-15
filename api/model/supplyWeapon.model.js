const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model');
const Supplier = require('./supplier.model');


const SupplyWeapon = sequelize.define('SupplyWeapon', {
    weaponModelID: {type:DataTypes.INTEGER,primaryKey:true,references: { Model: WeaponModel, key: 'weaponModelID' },},
    supplierID: {type:DataTypes.INTEGER,primaryKey:true,references: { Model: Supplier, key: 'supplierID' },},
    
  }, {freezeTableName: true,timestamps:false})
  
  SupplyWeapon.removeAttribute('id')

module.exports = SupplyWeapon;