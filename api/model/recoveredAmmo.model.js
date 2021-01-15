const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const RecoveredAmmunition = sequelize.define('RecoveredAmmunition', {
    recoveryID: DataTypes.INTEGER,
    ammoModelID: DataTypes.INTEGER,
  }, {freezeTableName: true,timestamps:false})
  
  RecoveredAmmunition.removeAttribute('id')

module.exports = RecoveredAmmunition;