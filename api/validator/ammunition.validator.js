const Joi = require('@hapi/joi');

function validateAmmunition(req,res,next) {
	const schema = Joi.object({
		ammoModelID: Joi.number().integer().min(1),
		count: Joi.number().integer().min(1),
        orderID: Joi.number().integer().min(1),
		remain: Joi.number().integer().min(0),
		//Station: Joi.array()
		}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error)
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateAmmunition;
	


	
