const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Joi = require('joi');

const Station = sequelize.define(
	'Station',
	{
		stationID: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING(100),
		location: DataTypes.STRING(100),
		type: DataTypes.STRING(10),
	},
	{ freezeTableName: true, timestamps: false }
);

Station.removeAttribute('id');


function validateStation(Station){
    const schema = {
      stationId : Joi.number()
                    .integer()
                    .min(2)
                    .max(11)
                    .required(),
  
      name : Joi.string()
                .min(3)
                .max(100)
                .required(),
  
      location : Joi.string()
                    .alphanum()
                    .min(3)
                    .max(100)
                    .required(),
  
      role : Joi.string()
                .min(3)
                .max(10)
                .required()
    };
    return Joi.validate(Station,schema);
  }
  
  module.exports = Station;
  exports.validate = validateStation;



