const Joi = require('@hapi/joi');

function validateRecovery(req,res,next) {
	const schema = Joi.object({
		recoveryID: Joi.number().integer().min(1),
		recoveryDate: Joi.date().iso(),
		description: Joi.string().min(2).max(100),
		stationID: Joi.number().integer().min(1),
		RecoveredAmmunitions: Joi.array(),
		RecoveredWeapons: Joi.array()
	}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateRecovery;