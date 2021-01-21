exports.converter = (obj) => {
	let result = {};
	let props = Object.getOwnPropertyNames(obj);
	props.forEach((prop) => {
		if (typeof obj[prop] == 'object' && obj[prop] != null) {
			let next = obj[prop].dataValues ? obj[prop].dataValues: obj[prop]
            let sub = this.converter(next);
			result = { ...result, ...sub };
		} else {
			result[prop] = obj[prop];
		}
    });
	return result;
};
