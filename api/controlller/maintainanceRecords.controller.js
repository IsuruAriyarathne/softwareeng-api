const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const MaintainanceRecord = require('../model/maintainanceRecord.model');
const WeaponStation = require('../model/weaponStation.model');
const { Op } = require('sequelize');
const { converter } = require('../utils/objectConverter');

exports.getMaintainanceRecords = async (req, res) => {
	let maintainanceRecords = [];
	try {
		maintainanceRecords = await MaintainanceRecord.findAll({
			include: { model: Weapon, include: { model: WeaponModel } },
		});
		maintainanceRecords = maintainanceRecords.map((item) => converter(item.dataValues));
		return res.status(200).send(maintainanceRecords);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getStationMaintainanceRecords = async (req, res) => {
	let maintainanceRecords = [];
	let weapons = [];
	try {
		weapons = await WeaponStation.findAll({ where: { stationID: req.params.stationID, assigned: 1 } });
		weapons = weapons.map((item) => item.dataValues.weaponID);
		maintainanceRecords = await MaintainanceRecord.findAll(
			{ where: { weaponID: { [Op.in]: weapons } } },
			{ include: { include: { Weapon, include: { WeaponModel } } } }
		);
		return res.status(200).send(maintainanceRecords);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getWeaponMaintainanceRecords = async (req, res) => {
	let maintainanceRecords = {};
	try {
		maintainanceRecords = await MaintainanceRecord.findAll({
			where: { weaponID: req.params.weaponID },
		});

		return res.status(200).send(maintainanceRecords);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.createMaintainanceRecord = async (req, res) => {
	let maintainanceRecord = req.body;
	try {
		maintainanceRecord = await MaintainanceRecord.create(req.body);
		return res.status(200).send(maintainanceRecord);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateMaintainanceRecord = async (req, res) => {
	let maintainanceRecord = req.body;
	try {
		maintainanceRecord = await MaintainanceRecord.update(
			{ ...req.body },
			{
				where: {
					id: req.params.id,
				},
			}
		);
		maintainanceRecord = await MaintainanceRecord.findOne({
			where: { id: req.params.id },
		});
		maintainanceRecord = maintainanceRecord.dataValues;
		return res.status(200).send(maintainanceRecord);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

//check

exports.deleteMaintainanceRecord = async (req, res) => {
	try {
		await MaintainanceRecord.destroy({ where: { id: req.params.id } });
		return res.status(200).send('Succesfully maintainance record deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
