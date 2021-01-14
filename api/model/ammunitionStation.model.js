const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const AmmunitionStation = sequelize.define('AmmunitionStation', {
    ammoModelID: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    orderID: DataTypes.INTEGER,
    stationID: DataTypes.INTEGER,
    allocatedDate: DataTypes.DATEONLY,
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionStation.removeAttribute('id')

module.exports = AmmunitionStation;