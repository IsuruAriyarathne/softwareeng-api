const Joi = require('@hapi/joi');

function validateWeaponModel(req,res,next) {
	const schema = Joi.object({
		weaponModelID: Joi.number().integer().min(1),
        name: Joi.string().min(2).max(100),
		description: Joi.string().min(2).max(100),
		}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error)
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateWeaponModel;