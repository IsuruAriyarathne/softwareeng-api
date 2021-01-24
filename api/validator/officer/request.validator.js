const Joi = require('@hapi/joi');

function validateRequest(req,res,next) {
	const schema = Joi.object({
		requestID: Joi.number().integer().min(1),
		date: Joi.date().iso().required(),
		comments: Joi.string().min(2).max(100).required(),
		stationID: Joi.number().integer().min(1).required(),
		state: Joi.string().min(2).max(20).required(),
		WeaponRequests: Joi.array(),
		WeaponRequests: Joi.array()
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

module.exports = validateRequest;