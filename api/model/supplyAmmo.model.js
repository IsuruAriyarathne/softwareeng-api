const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AmmunitionType = require('./ammunitionType.model');
const Supplier = require('./supplier.model');

const SupplyAmmunition = sequelize.define(
	'SupplyAmmunition',
	{
		ammoModelID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: { Model: AmmunitionType, key: 'ammoModelID' },
		},
		supplierID: { type: DataTypes.INTEGER, primaryKey: true, references: { Model: Supplier, key: 'supplierID' } },
	},
	{ freezeTableName: true, timestamps: false }
);

SupplyAmmunition.removeAttribute('id');

module.exports = SupplyAmmunition;
