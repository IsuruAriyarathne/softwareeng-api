const Joi = require('@hapi/joi');

function validateMaintainanceRecord(req,res,next) {
	const schema = Joi.object({
		id: Joi.number().integer().min(1),
        weaponID: Joi.number().integer().min(1),
        description: Joi.string().min(3).max(200),
        date: Joi.date().iso(),
        amount: Joi.number().positive().greater(1).precision(2)
		}).unknown(true);;

	const { error, value } = schema.validate(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateMaintainanceRecord;
	


	
