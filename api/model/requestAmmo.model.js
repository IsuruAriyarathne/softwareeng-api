const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AmmunitionType = require('./ammunitionType.model');
const Request = require('./request.model');

const RequestAmmunition = sequelize.define(
	'RequestAmmunition',
	{
        requestID: { type: DataTypes.INTEGER, primaryKey: true },
        
		amount: DataTypes.INTEGER,
		ammoModelID: {type:DataTypes.INTEGER, primaryKey:true},
	},
	{ freezeTableName: true, timestamps: false }
);

// RequestAmmunition.belongsTo(Request, { foreignKey: 'requestID' })
// RequestAmmunition.belongsTo(AmmunitionType, { foreignKey: 'ammoModelID' })

RequestAmmunition.removeAttribute('id');
module.exports = RequestAmmunition;



