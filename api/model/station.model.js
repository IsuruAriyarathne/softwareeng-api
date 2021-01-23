const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Station = sequelize.define(
	'Station',
	{
		stationID: { type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true,},
		stationName: DataTypes.STRING(100),
		location: DataTypes.STRING(100),
		type: DataTypes.STRING(10),
		contactNo: DataTypes.STRING(10),
	},
	{ freezeTableName: true, timestamps: false }
);

Station.removeAttribute('id');
module.exports = Station;



