const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Joi = require('joi');

const User = sequelize.define(
	'User',
	{
		officerID: { type: Sequelize.STRING, primaryKey: true },
		name: Sequelize.TEXT,
		email: Sequelize.TEXT,
		password: Sequelize.TEXT,
		role: Sequelize.TEXT,
		stationID: Sequelize.TEXT,
	},
	{ freezeTableName: true, timestamps: false }
);

User.removeAttribute('id');


function validateUser(User){
	const schema = Joi.object.keys({
	  officerId : Joi.number()
					.integer()
					.min(2)
					.max(40)
					.required(),
  
// 	  name : Joi.string()
// 				.min(3)
// 				.max(20)
// 				.required(),
  
// 	  location : Joi.string()
// 					.alphanum()
// 					.min(3)
// 					.max(100)
// 					.required(),
  
// 	  password : Joi.string()
// 					.alphanum()
// 					.min(4)
// 					.max(40)
// 					.required(),
  
// 	  role : Joi.string()
// 				.min(3)
// 				.max(10)
// 				.required(),
  
	  stationID : Joi.number()
					.integer()
					.min(1)
					.max(10)
					.required()
	});
	return Joi.validate(User,schema);
  }
  
  module.exports = {
	  User,
	  validateUser
  }
  //exports.User = function(){};
  //exports.validateUser = function(){};


