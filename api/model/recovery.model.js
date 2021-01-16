const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model');
const RecoveredWeapon = require('./recoveredWeapon.model');
const RecoveredAmmunition = require('./recoveredAmmo.model');

const Recovery = sequelize.define(
	'Recovery',
	{
		recoveryID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		recoveryDate: DataTypes.DATEONLY,
		description: DataTypes.STRING(100),
		stationID: {
			type: DataTypes.INTEGER,
		},
	},
	{ freezeTableName: true, timestamps: false }
);

Recovery.removeAttribute('id');
Recovery.hasMany(RecoveredWeapon,{foreignKey:'recoveryID'})
Recovery.hasMany(RecoveredAmmunition,{foreignKey:'recoveryID'})
Recovery.belongsTo(Station,{foreignKey:'stationID'})
module.exports = Recovery;
