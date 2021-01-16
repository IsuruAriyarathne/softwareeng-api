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
		},
		supplierID: { type: DataTypes.INTEGER, primaryKey: true },
	},
	{ freezeTableName: true, timestamps: false }
);

SupplyAmmunition.belongsTo(AmmunitionType, { foreignKey: 'ammoModelID' });
SupplyAmmunition.removeAttribute('id');

module.exports = SupplyAmmunition;
