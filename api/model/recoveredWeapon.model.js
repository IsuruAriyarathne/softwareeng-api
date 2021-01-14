const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const RecoveredWeapon = sequelize.define('RecoveredWeapon', {
    recoveryID: DataTypes.INTEGER,
    weaponModelID: DataTypes.INTEGER,
  }, {freezeTableName: true,timestamps:false})
  
  RecoveredWeapon.removeAttribute('id')

module.exports = RecoveredWeapon;