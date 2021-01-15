const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');
const AmmunitionType = require('./ammunitionType.model');

const AmmunitionBatch = sequelize.define(
	'AmmunitionBatch',
	{
		ammoModelID: {
			type: DataTypes.INTEGER,
			references: {
				model: AmmunitionType,
				key: 'ammoModelID',
			},
			primaryKey: true,
		},
		orderID: {
			type: DataTypes.INTEGER,
			references: {
				model: Order,
				key: 'orderID',
			},
			primaryKey: true,
		},
		count: DataTypes.INTEGER,
	},
	{ freezeTableName: true, timestamps: false }
);

AmmunitionBatch.removeAttribute('id');

// AmmunitionBatch.hasOne(Order);

module.exports = AmmunitionBatch;
