const Joi = require('@hapi/joi');

function validateCompanies(req,res,next) {
	const schema = Joi.object({
		supplierID: Joi.number().integer().min(1),
        name: Joi.string().min(2).max(100).required(),
        contactNumber: Joi.string().max(10).required(),
		address: Joi.string().alphanum().min(2).max(255).required(),
		description: Joi.string().min(2).max(100)
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

module.exports = validateCompanies;
	


	
