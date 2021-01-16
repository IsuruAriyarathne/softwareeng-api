const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order.model');
const AmmunitionType = require('./ammunitionType.model');

const AmmunitionOrder = sequelize.define(
	'AmmunitionOrder',
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
		cost: DataTypes.FLOAT,
		state: DataTypes.STRING(20),
		description: DataTypes.STRING(200),
	},
	{ freezeTableName: true, timestamps: false }
);

AmmunitionOrder.removeAttribute('id');
// AmmunitionOrder.belongsTo(Order, { foreignKey: 'orderID' });
AmmunitionOrder.belongsTo(AmmunitionType, { foreignKey: 'ammoModelID' });

// AmmunitionOrder.hasOne(Order);
module.exports = AmmunitionOrder;
