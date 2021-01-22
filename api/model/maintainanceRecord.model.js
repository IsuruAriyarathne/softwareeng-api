const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Weapon = require('./weapon.model');

const MaintainanceRecord = sequelize.define(
	'MaintainanceRecord',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true, },
		weaponID: {
			type: DataTypes.INTEGER,
		},
		description: DataTypes.STRING(200),
		date: DataTypes.DATEONLY,
		amount: DataTypes.FLOAT,
	},
	{ freezeTableName: true, timestamps: false }
);

MaintainanceRecord.belongsTo(Weapon, { foreignKey: 'weaponID' });

module.exports = MaintainanceRecord;
