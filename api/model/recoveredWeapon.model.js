const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model')

const RecoveredWeapon = sequelize.define('RecoveredWeapon', {
    recoveryID: {
			type: DataTypes.INTEGER,
      primaryKey: true,
		},
    weaponModelID: {
			type: DataTypes.INTEGER,
      primaryKey:true,
		},
  }, {freezeTableName: true,timestamps:false})
  
  RecoveredWeapon.removeAttribute('id')
  // RecoveredWeapon.hasOne(WeaponModel);


module.exports = RecoveredWeapon;