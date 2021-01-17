const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model');
const Order = require('./order.model');
const AmmunitionType = require('./ammunitionType.model');

const AmmunitionStation = sequelize.define(
	'AmmunitionStation',
	{
		ammoModelID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		count: DataTypes.INTEGER,
		orderID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		stationID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		allocatedDate: DataTypes.DATEONLY,
		state: DataTypes.STRING(10),
	},
	{ freezeTableName: true, timestamps: false }
);

AmmunitionStation.removeAttribute('id');
AmmunitionStation.belongsTo(AmmunitionType, { foreignKey: 'ammoModelID' });
AmmunitionStation.belongsTo(Order, { foreignKey: 'orderID' });
AmmunitionStation.belongsTo(Station, { foreignKey: 'stationID' });

module.exports = AmmunitionStation;
