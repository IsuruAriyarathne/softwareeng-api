const Joi = require('@hapi/joi');

function validateOrder(req,res,next) {
	const schema = Joi.object({
		orderID: Joi.number().integer().min(1),
		supplierID: Joi.number().integer().min(1),
        date: Joi.date().iso(),
        totalCost: Joi.number().positive().greater(1).precision(2),
        state: Joi.string().min(3).max(20),
		description: Joi.string().min(3).max(200),
		//WeaponOrder: Joi.array(),
		
	}).unknown(true);

	const { error, value } = schema.validate(req.body);
	if (error) {
		next(error)
		res.status(400).send(error.details[0].message);
	} else {
		next();
	}
	
}

module.exports = validateOrder;
	


	
