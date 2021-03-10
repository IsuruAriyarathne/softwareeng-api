const Joi = require('@hapi/joi');

function validateWeapon(req,res,next) {
	const schema = Joi.object({
		weaponID: Joi.number().integer().min(1),
		weaponModelID: Joi.number().integer().min(1),
		orderID: Joi.number().integer().min(1),
		state: Joi.string().valid('Lost','Available','Unavailable','Maintainance'),
		}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateWeapon;
	


	
