const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SupplyAmmunition = require('./supplyAmmo.model');
const SupplyWeapon = require('./supplyWeapon.model');

const Supplier = sequelize.define(
	'Supplier',
	{
		supplierID: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING(100),
		contactNumber: DataTypes.STRING(10),
		address: DataTypes.STRING(255),
		description: DataTypes.STRING(100),
	},
	{ freezeTableName: true, timestamps: false }
);

Supplier.hasMany(SupplyAmmunition, { foreignKey: 'supplierID' });
Supplier.hasMany(SupplyWeapon, { foreignKey: 'supplierID' });

Supplier.removeAttribute('id');

module.exports = Supplier;
