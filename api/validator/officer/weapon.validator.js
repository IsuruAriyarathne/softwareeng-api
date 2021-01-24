const Joi = require('@hapi/joi');

function validateWeapon(req,res,next) {
	const schema = Joi.object({
		weaponID: Joi.number().integer().min(1),
		weaponModelID: Joi.number().integer().min(1).required(),
		orderID: Joi.number().integer().min(1).required(),
		state: Joi.string().valid('Lost','Available','Unavailable').required()
		}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		// on fail return comma separated errors
		//next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
		next(error)
		res.status(400).send(error.details[0].message);
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		//req.body = value;
		next();
	}
	
}

module.exports = validateWeapon;
	


	
