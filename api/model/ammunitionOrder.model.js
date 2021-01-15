const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');
const AmmunitionType = require('./ammunitionType.model');

const AmmunitionOrder = sequelize.define(
	'AmmunitionOrder',
	{
		ammoModelID: {
			type: DataTypes.INTEGER,
			references: {
				model: AmmunitionType,
				key: 'ammoModelID',
      },
      primaryKey:true,
		},
		orderID: {
			type: DataTypes.INTEGER,
			references: {
				model: Order,
				key: 'orderID',
      },
      primaryKey:true,
		},
		count: DataTypes.INTEGER,
		cost: DataTypes.FLOAT,
		state: DataTypes.STRING(20),
		description: DataTypes.STRING(200),
	},
	{ freezeTableName: true, timestamps: false }
);

AmmunitionOrder.removeAttribute('id');
AmmunitionOrder.hasOne(Order);
module.exports = AmmunitionOrder;
