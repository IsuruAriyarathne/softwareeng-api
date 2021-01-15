const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Weapon = require('./weapon.model');

const MaintainanceRecord = sequelize.define(
	'MaintainanceRecord',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true },
		weaponID: {
			type: DataTypes.INTEGER,
			references: {
				Model: Weapon,
				key: 'weaponID',
			},
		},
		description: DataTypes.STRING(200),
		date: DataTypes.DATEONLY,
		amount: DataTypes.FLOAT,
	},
	{ freezeTableName: true, timestamps: false }
);

MaintainanceRecord.hasOne(Weapon);
module.exports = MaintainanceRecord;
