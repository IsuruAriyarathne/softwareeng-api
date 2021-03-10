const Joi = require('@hapi/joi');

function validateRequest(req,res,next) {
	const schema = Joi.object({
		requestID: Joi.number().integer().min(1),
		date: Joi.date().iso(),
		comment: Joi.string().min(2).max(100),
		stationID: Joi.number().integer().min(1),
		state: Joi.string().min(2).max(20),
		WeaponRequests: Joi.array(),
		WeaponRequests: Joi.array()
		}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateRequest;