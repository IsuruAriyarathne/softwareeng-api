const Joi = require('@hapi/joi');

function validateMaintainanceRecord(req,res,next) {
	const schema = Joi.object({
		id: Joi.number().integer().min(1),
        weaponID: Joi.number().integer().min(1).required(),
        description: Joi.string().min(3).max(200).required(),
        date: Joi.date().iso().required(),
        amount: Joi.number().positive().greater(1).precision(2).required()
		});

	const { error, value } = schema.validate(req.body);
	if (error) {
		// on fail return comma separated errors
		//next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
		next(error)
		res.status(400).send(error.details[0].message);
	} else {
		// on success replace req.body with validated value and trigger next middleware function
		req.body = value;
		next();
	}
	
}

module.exports = validateMaintainanceRecord;
	


	
