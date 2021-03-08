const AmmunitionBatch = require('../model/ammunitionBatch.model');
const AmmunitionType = require('../model/ammunitionType.model');
const AmmunitionStation = require('../model/ammunitionStation.model');
const Order = require('../model/order.model');
const Station = require('../model/station.model');
var { Op } = require('sequelize');
var { converter } = require('../utils/objectConverter');
const AmmunitionOrder = require('../model/ammunitionOrder.model');
const sequelize = require('../config/db');

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
		return res.status(400).send(e.message);
	}
};

exports.updateAmmunitionStation = async (req, res) => {
	let ammunition = {};
	try {
		if (req.body.hasOwnProperty('remaining')) {
			ammunition = await AmmunitionStation.update(
				{ remaining: req.body.remaining },

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

			if (ammunition.hasOwnProperty('dataValues')) {
				ammunition = ammunition.dataValues;
			}

			return res.status(200).send(ammunition);
		} else {
			return res.status(401).send('Unauthorized');
		}
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

//check
exports.getAmmunitionBatches = async (req, res) => {
	let ammunitionBatches = {};
	try {
		ammunitionBatches = await AmmunitionBatch.findAll({
			include: [AmmunitionType, Order],
		});
		ammunitionBatches = ammunitionBatches.map((item) => converter(item.dataValues));
		return res.status(200).send(ammunitionBatches);
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
		ammunitionBatch = ammunitionBatch.map((item) => converter(item.dataValues));
		return res.status(200).send(ammunitionBatch);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.createAmmunitionBatch = async (req, res) => {
	let ammunitionBatch = req.body;
	try {
		ammunitionBatch = await AmmunitionBatch.create(req.body);
		return res.status(200).send(ammunitionBatch);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateAmmunitionBatch = async (req, res) => {
	let stations = [];
	let reqCount = 0;
	let t = await sequelize.transaction();
	try {
		if (req.body.hasOwnProperty('Station')) {
			stations = await AmmunitionStation.bulkCreate(req.body.Station, {
				updateOnDuplicate: ['count'],
				transaction: t,
			});
			reqCount = req.body.Station.reduce((prev, current) => prev + current.count, 0);
		}
		let assigned = await AmmunitionStation.findAll({
			attributes: [[sequelize.fn('sum', sequelize.col('count')), 'total']],
			where: { ammoModelID: req.params.ammoModelID, orderID: req.params.orderID },
		});
		let ammunitionBatch = await AmmunitionBatch.findOne({
			where: { ammoModelID: req.params.ammoModelID, orderID: req.params.orderID },
		});

		let remain = ammunitionBatch.dataValues.count - (assigned[0].dataValues.total + reqCount);
		if (remain < 0) {
			throw 'remain less than 0';
		}
		ammunitionBatch = await AmmunitionBatch.update(
			{ ...req.body, remain: remain },
			{
				where: { ammoModelID: req.params.ammoModelID, orderID: req.params.orderID },
				returning: true,
				transaction: t,
			}
		);
		ammunitionBatch = await AmmunitionBatch.findOne({
			where: { ammoModelID: req.params.ammoModelID, orderID: req.params.orderID },
		});
		await t.commit();
		ammunitionBatch = ammunitionBatch.dataValues;
		stations = stations.map((item) => item.dataValues);
		ammunitionBatch.Station = stations;
		return res.status(200).send(ammunitionBatch);
	} catch (e) {
		await t.rollback();
		return res.status(400).send(e.message);
	}
};

/**
 * @returns success or error message
 */
exports.deleteAmmunitionBatch = async (req, res) => {
	try {
		await AmmunitionBatch.destroy({ where: { ammoModelID: req.params.ammoModelID, orderID: req.params.orderID } });
		return res.status(200).send('Succesfully ammunition batch deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
