const Station = require('../model/station.model');
// const Op = db.Sequelize.Op;

exports.findAll = async () => {
	let stations = await Station.findAll();
	return stations;
};

exports.create = async (data) => {
	const stations = await Station.create({ ...data });
	return stations;
};

exports.findOne = async (id) => {
	const station = await Station.findByPk(id);
	return station;
};

exports.update = async (data) => {
    const station = await Station.update({data},{
		where: { officerID: data.officerID },
	});
	return station;
};

exports.delete = async (id) => {
	Station.destroy({
		where: { officerID: id },
	});
};
