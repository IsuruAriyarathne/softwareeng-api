const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model');


const WeaponOrder = sequelize.define('WeaponOrder', {
    weaponModelID: {type:DataTypes.INTEGER,primaryKey:true},
    orderID:{ type:DataTypes.INTEGER,primaryKey:true},
    count: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    state: DataTypes.STRING(20),
    description: DataTypes.STRING(200),
  }, {freezeTableName: true,timestamps:false})
  
  WeaponOrder.removeAttribute('id')
  WeaponOrder.belongsTo(WeaponModel, { foreignKey: 'weaponModelID' });

module.exports = WeaponOrder;