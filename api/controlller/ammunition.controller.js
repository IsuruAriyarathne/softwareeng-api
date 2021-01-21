const AmmunitionBatch = require('../model/ammunitionBatch.model');
const AmmunitionType = require('../model/ammunitionType.model');
const AmmunitionStation = require('../model/ammunitionStation.model');
const Order = require('../model/order.model');
const Station = require('../model/station.model');
var { Op } = require('sequelize');
var { converter } = require('../services/objectConverter');

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
		return res.status(200).json({ status: 200, data: ammunitions, message: 'Ammunitions succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
				.json({ status: 200, data: ammunition, message: 'Succesfully AmmunitionBatch updated' });
		} else {
			return res.status(401).json({ status: 401, data: ammunition, message: 'Unauthorized' });
		}
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

//check
exports.getAmmunitionBatches = async (req, res) => {
	let ammunitionBatches = {};
	try {
		ammunitionBatches = await AmmunitionBatch.findAll({
			include: {
				model: AmmunitionType,
				include: {
					model: Order,
				},
			},
		});
		return res
			.status(200)
			.json({ status: 200, data: ammunitionBatches, message: 'Ammunitions succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
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
			.json({ status: 200, data: ammunitionBatch, message: 'Ammunition Batch succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
	}
};

exports.createAmmunitionBatch = async (req, res) => {
	let ammunitionBatch = req.body;
	try {
		ammunitionBatch = await AmmunitionBatch.create(req.body);
		return res
			.status(200)
			.json({ status: 200, data: ammunitionBatch, message: 'Ammunition Batch succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
			.json({ status: 200, data: ammunitionBatch, message: 'AmmunitionBatch succesfully updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
