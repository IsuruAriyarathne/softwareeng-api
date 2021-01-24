const Joi = require('@hapi/joi');

function validateStation(req,res,next) {
	const schema = Joi.object({
		stationID: Joi.number().integer().min(1),
		stationName: Joi.string().min(2).max(100).required(),
		location: Joi.string().alphanum().min(2).max(100).required(),
		type: Joi.string().valid('office','inventory').lowercase().required(),
		contactNo: Joi.string().max(10).required()
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

module.exports = validateStation;
	


	
