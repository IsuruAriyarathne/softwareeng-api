const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./supplier.model');
const WeaponOrder = require('./weaponOrder.model');
const AmmunitionOrder = require('./ammunitionOrder.model');

const Order = sequelize.define(
	'Order',
	{
		orderID: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true, },
		supplierID: { type: DataTypes.INTEGER, references: { Model: Supplier, key: 'supplierID' } },
		date: DataTypes.DATEONLY,
		totalCost: DataTypes.FLOAT,
		state: DataTypes.STRING(20),
		description: DataTypes.STRING(200),
	},
	{ freezeTableName: true, timestamps: false }
);

Order.removeAttribute('id');
Order.belongsTo(Supplier, { foreignKey: 'supplierID' });
Order.hasMany(WeaponOrder, { foreignKey: 'orderID' });
Order.hasMany(AmmunitionOrder, { foreignKey: 'orderID' });

module.exports = Order;
