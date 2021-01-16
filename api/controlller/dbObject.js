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
		let arr1 = [];
		obj['model'] = models[i];
		if (Array.isArray(models[i])) {
			let obj1 = {};
			obj['model'] = models[i][0];
			obj1['model'] = models[i][1];
			// obj1['required'] = true;
			arr1[0] = obj1;
		}
		obj['required'] = true;
		if (arr1.length > 0) {
			obj['include'] = arr1;
		}
		arr[i] = obj;
	}

	return arr;
};
