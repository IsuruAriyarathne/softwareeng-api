const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AmmunitionType = require('./ammunitionType.model');

const RecoveredAmmunition = sequelize.define(
	'RecoveredAmmunition',
	{
		recoveryID: {
			type: DataTypes.INTEGER,

			primaryKey: true,
		},
		ammoModelID: {
			type: DataTypes.INTEGER,

			primaryKey: true,
		},
	},
	{ freezeTableName: true, timestamps: false }
);

RecoveredAmmunition.removeAttribute('id');
// RecoveredAmmunition.hasOne(AmmunitionType)
// RecoveredAmmunition.hasOne(Recovery)
module.exports = RecoveredAmmunition;
