const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const Supplier = sequelize.define('Supplier', {
    supplierID: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    contactNumber: DataTypes.STRING(200),
    address: DataTypes.STRING(255),
    description: DataTypes.STRING(100),
  }, {freezeTableName: true,timestamps:false})
  
  Supplier.removeAttribute('id')

module.exports = Supplier;