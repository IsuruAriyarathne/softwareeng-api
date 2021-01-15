const { Sequelize, DataTypes, Op } = require('sequelize');
const config = require('./config');
const sequelize = new Sequelize(config.db, config.user, config.password, {
	host: config.host,
	dialect: config.dialect,
	operatorsAliases: false,
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	})
	.finally(() => {
		sequelize.close();
	});