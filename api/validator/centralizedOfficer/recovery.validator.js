const Joi = require('@hapi/joi');

function validateRecovery(req,res,next) {
	const schema = Joi.object({
		recoveryID: Joi.number().integer().min(1),
		recoveryDate: Joi.date().iso().required(),
		description: Joi.string().min(2).max(100).required(),
		stationID: Joi.number().integer().min(1).required(),
		RecoveredAmmunitions: Joi.array(),
		RecoveredWeapons: Joi.array()
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

module.exports = validateRecovery;