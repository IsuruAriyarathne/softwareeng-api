const Joi = require('@hapi/joi');

function validateAmmunition(req,res,next) {
	const schema = Joi.object({
		ammoModelID: Joi.number().integer().min(1).required(),
		count: Joi.number().integer().min(1).required(),
        orderID: Joi.number().integer().min(1).required(),
        remaining: Joi.number().integer().min(0).required()
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

module.exports = validateAmmunition;
	


	
