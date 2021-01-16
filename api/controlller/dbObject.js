const { Op } = require('sequelize');
exports.getDeleteObject = (field, val) => {
	let obj = {};
	obj[field] = val;
	return obj;
};

exports.getWhereObject = (field, val) => {
	let obj = {};
	obj[field] = { [Op.eq]: val };
	return obj;
};
exports.getSearchObject = (col, val) => {
	let obj = {};
	obj[col] = { [Op.substring]: val };
	return obj;
};

//column  name and ASC or DESC
exports.getSearchObject = (col, order) => {
	let arr = [];
	arr[0] = [col, order];
	return obj;
};

exports.getIncludeObject = (models) => {
	// console.log(arguments);
    arr = [];
	for (let i = 0; i < models.length; i++) {
		let obj = {};
		obj['model'] = models[i];
		obj['required'] = true;
		arr[i] = obj;
	}

	return arr;
};
