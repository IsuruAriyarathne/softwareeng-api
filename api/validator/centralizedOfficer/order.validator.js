const Joi = require('@hapi/joi');

function validateOrder(req,res,next) {
	const schema = Joi.object({
		orderID: Joi.number().integer().min(1),
		supplierID: Joi.number().integer().min(1).required(),
        date: Joi.date().iso().required(),
        totalCost: Joi.number().positive().greater(1).precision(2).required(),
        state: Joi.string().min(3).max(20).required(),
		description: Joi.string().min(3).max(200),
		//WeaponOrder: Joi.array(),
		
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

module.exports = validateOrder;
	


	
