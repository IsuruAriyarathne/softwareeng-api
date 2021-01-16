const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');
const AmmunitionType = require('./ammunitionType.model');
const AmmunitionStation = require('./ammunitionStation.model');

const AmmunitionBatch = sequelize.define(
	'AmmunitionBatch',
	{
		ammoModelID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		orderID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		count: DataTypes.INTEGER,
	},
	{ freezeTableName: true, timestamps: false }
);

AmmunitionBatch.removeAttribute('id');
AmmunitionBatch.belongsTo(Order,{foreignKey:'orderID'});
// AmmunitionBatch.hasMany(AmmunitionStation,{foreignKey:['ammoModelID','orderID']})
AmmunitionBatch.belongsTo(AmmunitionType,{foreignKey:'ammoModelID'});

module.exports = AmmunitionBatch;
