const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Request = require('./request.model');
const WeaponModel = require('./weaponModel.model');

const RequestWeapon = sequelize.define(
	'Request',
	{
        requestID: { type: DataTypes.INTEGER, primaryKey: true },
		amount: DataTypes.INTEGER,
		weaponModelID: {type:DataTypes.INTEGER, primaryKey:true},
	},
	{ freezeTableName: true, timestamps: false }
);

RequestWeapon.belongsTo(Request, { foreignKey: 'requestID' })
RequestWeapon.belongsTo(WeaponModel, { foreignKey: 'weaponModelID' })

RequestWeapon.removeAttribute('id');
module.exports = RequestWeapon;



