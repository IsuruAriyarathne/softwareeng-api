exports.converter = (obj) => {
	let result = {};
	let props = Object.getOwnPropertyNames(obj);
	props.forEach((prop) => {
		if (typeof obj[prop] == 'object') {
            let sub = this.converter(obj[prop].dataValues);
			result = { ...result, ...sub };
		} else {
			result[prop] = obj[prop];
		}
    });
	return result;
};
