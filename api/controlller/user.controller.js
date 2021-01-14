const User = require('../model/user.model');
// const Op = db.Sequelize.Op;

exports.findAll = async () => {
	let users = await User.findAll();
	return users;
};

exports.create = async (data) => {
	const users = await User.create({ ...data });
	return users;
};

exports.findOne = async (id) => {
	const user = await User.findByPk(id);
	return user;
};

exports.update = async (data) => {
	console.log(data);
    const user = await User.update({...data},{
		where: { officerID: data.officerID },
	});
	console.log(user);
	return user;
};

exports.delete = async (id) => {
	User.destroy({
		where: { officerId: id },
	});
};
