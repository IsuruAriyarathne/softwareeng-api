const Joi = require('@hapi/joi');

function validateStation(req, res, next) {
	const schema = Joi.object({
		stationID: Joi.number().integer().min(1),
		stationName: Joi.string().min(2).max(100),
		location: Joi.string().min(2).max(100),
		type: Joi.string().valid('office', 'inventory').lowercase(),
		contactNo: Joi.string().max(10),
	}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error);
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
}

module.exports = validateStation;
