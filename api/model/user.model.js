const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model');

const User = sequelize.define(
	'User',
	{
		officerID: { type: Sequelize.STRING, primaryKey: true, autoIncrement: true },
		name: Sequelize.TEXT,
		email: Sequelize.TEXT,
		password: Sequelize.TEXT,
		role: Sequelize.TEXT,
		stationID: Sequelize.TEXT,
	},
	{ freezeTableName: true, timestamps: false }
);
User.belongsTo(Station, { foreignKey: 'stationID' });
User.removeAttribute('id');

module.exports = User;
