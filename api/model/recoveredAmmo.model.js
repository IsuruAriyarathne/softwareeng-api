const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const AmmunitionType = require('./ammunitionType.model')
const Recovery = require('./recovery.model')

const RecoveredAmmunition = sequelize.define('RecoveredAmmunition', {
    recoveryID: {
			type: DataTypes.INTEGER,
			references: {
				model: Recovery,
				key: 'recoveryID',
      },
      primaryKey: true,
		},
    ammoModelID:{
			type: DataTypes.INTEGER,
			references: {
				model: AmmunitionType,
				key: 'ammoModelID',
      },
      primaryKey:true,
		},
  }, {freezeTableName: true,timestamps:false})
  
  RecoveredAmmunition.removeAttribute('id')
RecoveredAmmunition.hasOne(AmmunitionType)
RecoveredAmmunition.hasOne(Recovery)
module.exports = RecoveredAmmunition;   