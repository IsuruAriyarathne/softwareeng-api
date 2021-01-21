const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model');
const RequestWeapon = require('./requestWeapon.model');
const RequestAmmunition = require('./requestAmmunition.model');

const Request = sequelize.define(
	'Request',
	{
		requestID: { type: DataTypes.INTEGER, primaryKey: true },
		date: DataTypes.DATEONLY,
		comments: DataTypes.STRING(255),
		state: DataTypes.STRING(20),
		stationID: DataTypes.INTEGER,
	},
	{ freezeTableName: true, timestamps: false }
);

Request.belongsTo(Station, { foreignKey: 'stationID' })
Request.hasMany(RequestWeapon, { foreignKey: 'recoveryID' })
Request.belongsTo(RequestAmmunition, { foreignKey: 'recoveryID' })

Request.removeAttribute('id');
module.exports = Request;



