var Station = require('../model/station.model');
const { converter } = require('../utils/objectConverter');

/**
 * @typedef {Object} station
 *@returns {Array}: {stationID, stationName, contactNo, location, type}  
 */
exports.getStations = async (req, res) => {
	let stations = [];
	try {
		stations = await Station.findAll();
		stations = stations.map(item => converter(item.dataValues))
		return res.status(200).send(stations);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};


/**
 *@returns {Object}: {stationID, stationName, contactNo, location, type}  
 */
exports.getStation = async (req, res) => {
	let station = {};
	try {
		station = await Station.findOne({ where: { stationID: req.params.stationId } });
		if (station) {
			station = station.dataValues;
			return res.status(200).send(station);
		} else {
			return res.status(404).send( station );
		}
	} catch (e) {
		return res.status(400).send(e.message );
	}
};

/**
 *@returns {Object}: {stationID, stationName, contactNo, location, type}  
 */
exports.createStation = async (req, res) => {
	let station = req.body;
	try {
		station = await Station.create(req.body);
		return res.status(200).send(station);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

/**
 *@returns {Array}: {stationID, stationName, contactNo, location, type}  
 */
exports.updateStation = async (req, res) => {
	let station = {};
	try {
		station = await Station.update(
			{ ...req.body },
			{ where: { stationID: req.params.stationId }, returning: true }
		);
		station = await Station.findOne({ where: { stationID: req.params.stationId } });
		if(station){
			station = station.dataValues
		}
		return res.status(200).send(station);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.deleteStation = async (req, res) => {
	try {
		await Station.destroy({ where: { stationID: req.params.stationId } });
		return res.status(200).send('Succesfully station deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('Station cannot be deleted ,it has many records in database')
		}
		return res.status(400).send( e.message );
	}
};


