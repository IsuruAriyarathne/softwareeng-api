const Joi = require('@hapi/joi');

function validateUser(req,res,next) {
	const schema = Joi.object({
		officerID: Joi.number().integer().min(1),
		name: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().lowercase().required(),
		role: Joi.string().valid('admin', 'officer','cenofficer').required(),
        stationName: Joi.string().min(2).max(100).required()
		});

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

module.exports = validateUser;
	


	
