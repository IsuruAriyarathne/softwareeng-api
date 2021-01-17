const Joi = require('joi');

const validateStation = (obj) => {
	const schema = Joi.object({
		stationID: Joi.number().integer().min(1).max(11).required(),

		name: Joi.string().min(3).max(100).required(),

		location: Joi.string().alphanum().min(3).max(100).required(),

		type: Joi.string().min(3).max(10).required(),
	});
	// // return schema.validate()
    // let ob = Joi.validate(obj, schema);
    // console.log("Inside");
    // console.log(ob);
    return schema.validate(obj);
};

module.exports = validateStation