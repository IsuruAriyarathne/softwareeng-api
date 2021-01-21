var Station = require('../model/station.model');

exports.getStations = async (req, res) => {
	let stations = [];
	try {
		stations = await Station.findAll();
		return res.status(200).json({ status: 200, data: stations, message: 'Succesfully stations Retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.geStation = async (req, res) => {
	let station = {};
	try {
		station = await Station.findOne({ where: { stationID: req.params.stationId } });
		if (station) {
			return res.status(200).json({ status: 200, data: station, message: 'Succesfully station Retrieved' });
		} else {
			return res.status(404).json({ status: 404, data: station, message: 'Station not found' });
		}
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.createStation = async (req, res) => {
	let station = req.body;
	try {
		station = await Station.create(req.body);
		return res.status(200).json({ status: 200, data: station, message: 'Succesfully station created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.updateStation = async (req, res) => {
	let station = {};
	try {
		station = await Station.update(
			{ ...req.body },
			{ where: { stationID: req.params.stationId }, returning: true }
		);
		station = await Station.findOne({ where: { stationID: req.params.stationId } });
		return res.status(200).json({ status: 200, data: station, message: 'Succesfully station updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.deleteStation = async (req, res) => {
	try {
		await Station.destroy({ where: { stationID: req.params.stationId } });
		return res.status(200).json({ status: 200, message: 'Succesfully station deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
