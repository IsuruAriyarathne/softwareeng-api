const AmmunitionBatch = require('../model/ammunitionBatch.model');
const AmmunitionType = require('../model/ammunitionType.model');
const AmmunitionStation = require('../model/ammunitionStation.model');
const Order = require('../model/order.model');
const Station = require('../model/station.model');
var { Op } = require('sequelize');
var { converter } = require('../services/objectConverter');
const AmmunitionOrder = require('../model/ammunitionOrder.model');

exports.getAmmunitionStation = async (req, res) => {
	let ammunitions = [];
	try {
		ammunitions = await AmmunitionStation.findAll({
			where: {
				stationID: req.params.stationID,
				remaining: {
					[Op.gt]: 0,
				},
			},
			include: { model: AmmunitionType, required: true },
		});
		ammunitions = ammunitions.map((item) => converter(item.dataValues));
		return res.status(200).send(ammunitions);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.updateAmmunitionStation = async (req, res) => {
	let ammunition = {};
	try {
		if (req.body.hasOwnProperty('count')) {
			ammunition = await AmmunitionStation.update(
				{ count: req.body.count },

				{
					where: {
						ammoModelID: req.params.ammoModelID,
						stationID: req.body.stationID,
						orderID: req.body.orderID,
					},
					returning: true,
				}
			);
			ammunition = await AmmunitionStation.findOne({
				where: {
					ammoModelID: req.params.ammoModelID,
					stationID: req.body.stationID,
					orderID: req.body.orderID,
				},
			});
			return res
				.status(200)
				.send( ammunition);
		} else {
			return res.status(401).send('Unauthorized');
		}
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

//check
exports.getAmmunitionBatches = async (req, res) => {
	let ammunitionBatches = {};
	try {
		ammunitionBatches = await AmmunitionBatch.findAll({
			include: [AmmunitionType,Order]
		});
		return res
			.status(200)
			.send(ammunitionBatches);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getAmmunitionBatch = async (req, res) => {
	let ammunitionBatch = {};
	try {
		ammunitionBatch = await AmmunitionStation.findAll({
			where: {
				ammoModelID: req.params.ammoModelID,
				orderID: req.params.orderID,
			},
			include: {
				model: Station,
			},
		});
		return res
			.status(200)
			.send(ammunitionBatch);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.createAmmunitionBatch = async (req, res) => {
	let ammunitionBatch = req.body;
	try {
		ammunitionBatch = await AmmunitionBatch.create(req.body);
		return res
			.status(200)
			.send({ status: 200, data: ammunitionBatch, message: 'Ammunition Batch succesfully created' });
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateAmmunitionBatch = async (req, res) => {
	let ammunitionBatch = {};
	try {
		ammunitionBatch = await AmmunitionBatch.update(
			{ ...req.body },
			{ where: { ammoModelID: req.params.ammoModelID, orderID: req.body.orderID }, returning: true }
		);
		ammunitionBatch = await AmmunitionBatch.findOne({
			where: { ammoModelID: req.params.ammoModelID, orderID: req.body.orderID },
		});
		return res
			.status(200)
			.send(ammunitionBatch);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};
