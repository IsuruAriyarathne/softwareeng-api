const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const AmmunitionStation = sequelize.define('AmmunitionStation', {
    ammoModelID: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(100),
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionStation.removeAttribute('id')

module.exports = AmmunitionStation;