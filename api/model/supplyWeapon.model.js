const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const WeaponModel = require('./weaponModel.model');
const Supplier = require('./supplier.model');

const SupplyWeapon = sequelize.define(
	'SupplyWeapon',
	{
		weaponModelID: { type: DataTypes.INTEGER, primaryKey: true },
		supplierID: { type: DataTypes.INTEGER, primaryKey: true },
	},
	{ freezeTableName: true, timestamps: false }
);

SupplyWeapon.removeAttribute('id');
SupplyWeapon.belongsTo(WeaponModel, { foreignKey: 'weaponModelID' });

module.exports = SupplyWeapon;
