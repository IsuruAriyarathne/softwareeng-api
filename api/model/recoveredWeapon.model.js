const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Recovery = require('./recovery.model')
const WeaponModel = require('./weaponModel.model')

const RecoveredWeapon = sequelize.define('RecoveredWeapon', {
    recoveryID: {
			type: DataTypes.INTEGER,
			references: {
				model: Recovery,
				key: 'recoveryID',
      },
      primaryKey: true,
		},
    weaponModelID: {
			type: DataTypes.INTEGER,
			references: {
				model: WeaponModel,
				key: 'weaponModelID',
      },
      primaryKey:true,
		},
  }, {freezeTableName: true,timestamps:false})
  
  RecoveredWeapon.removeAttribute('id')
  RecoveredWeapon.hasOne(Recovery);
  RecoveredWeapon.hasOne(WeaponModel);


module.exports = RecoveredWeapon;