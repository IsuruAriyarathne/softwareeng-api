const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const AmmunitionType = sequelize.define('AmmunitionStation', {
    ammoModelID: {
      type:DataTypes.INTEGER,
      primaryKey:true,
    
    },
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(100),
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionType.removeAttribute('id')

module.exports = AmmunitionType;