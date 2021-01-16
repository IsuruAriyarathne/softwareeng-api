const Op = require('sequelize');

//select Queries
exports.findAll = (Model) => {
	return async (where={}, attributes = [], include = null, orderBy = []) => {
		let results = await Model.findAll({
			attributes:{exclude:attributes},
			include: include == null ? null: include,
			where: { ...where },
			order: [...orderBy],
			//Get provided amount of results only
			// limit: limit,
			//Get results from the provided offset onwards
			// offset: offset,
		});
		return results;
	};
};

//Insert
//Expects data with the matching field names
exports.create = (Model) => {
	return async (payload) => { 
		const results = await Model.create({ ...payload });
		return results;
	};
};

exports.update = (Model) => {
	return async (condition, payload) => {
		const result = await Model.update(
			{ ...payload },
			{
				where: { ...condition },
			}
		);
		return result;
	};
};

exports.delete = (Model) => {
	return async (payload) => {
		Model.destroy({
			where: { ...payload },
		})
			.then((res) => true)
			.catch((err) => console.log(err));
	};
};
