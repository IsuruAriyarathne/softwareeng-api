const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model');

const RecoveredWeapon = sequelize.define(
	'RecoveredWeapon',
	{
		recoveryID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		weaponModelID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		amount: {
			type: DataTypes.INTEGER,
		},
	},
	{ freezeTableName: true, timestamps: false }
);

RecoveredWeapon.removeAttribute('id');
RecoveredWeapon.belongsTo(WeaponModel, { foreignKey: 'weaponModelID' });
module.exports = RecoveredWeapon;
