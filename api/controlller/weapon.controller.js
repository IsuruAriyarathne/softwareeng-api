const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const WeaponStation = require('../model/weaponStation.model');
const Order = require('../model/order.model');
const Station = require('../model/station.model');
var { converter } = require('../services/objectConverter');
const sequelize = require('../config/db');
exports.getWeaponStation = async (req, res) => {
	let weapons = [];
	try {
		weapons = await WeaponStation.findAll({
			where: {
				stationID: req.params.stationID,
				assigned: 1,
			},
			include: [
				{
					model: Weapon,
					include: [
						{
							model: WeaponModel,
						},
					],
				},
			],
		});
		weapons = weapons.map((item) => converter(item.dataValues));
		return res.status(200).send(weapons);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateWeaponStation = async (req, res) => {
	let weapon = {};
	try {
		if (req.body.hasOwnProperty('state')) {
			weapon = await Weapon.update(
				{ state: req.body.state },
				{
					where: {
						weaponID: req.params.weaponID,
					},
					returning: true,
				}
			);
			weapon = await WeaponStation.findOne({
				where: { weaponID: req.params.weaponID, stationID: req.body.stationID, assigned: 1 },
				include: { model: Weapon },
			});
			weapon = converter(weapon.dataValues);
		} else {
			return res.status(401).send(weapon);
		}

		return res.status(200).send(weapon);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

//check
exports.getWeapons = async (req, res) => {
	let weapons = {};
	try {
		weapons = await Weapon.findAll({
			include: [WeaponModel, Order],
		});
		weapons = weapons.map((item) => converter(item.dataValues));
		return res.status(200).send(weapons);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getWeapon = async (req, res) => {
	let weapon = {};
	try {
		weapon = await WeaponStation.findAll({
			where: {
				weaponID: req.params.weaponID,
			},
			include: {
				model: Station,
			},
		});
		weapon = weapon.map((item) => converter(item.dataValues));
		return res.status(200).send(weapon);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.createWeapon = async (req, res) => {
	let weapon = req.body;
	try {
		weapon = await Weapon.create(req.body);
		return res.status(200).send(weapon);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateWeapon = async (req, res) => {
	let weapon = req.body;
	let stations = [];
	let t = await sequelize.transaction();
	try {
		if (weapon.hasOwnProperty('Station')) {
			stations = await WeaponStation.bulkCreate(weapon.Station, {
				updateOnDuplicate: ['assigned'],
				transaction: t,
			});
		}
		weapon = await Weapon.update(
			{ ...req.body },
			{ where: { weaponID: req.params.weaponID }, returning: true, transaction: t }
		);
		await t.commit();
		weapon = await Weapon.findOne({ where: { weaponID: req.params.weaponID } });
		weapon = weapon.dataValues;
		weapon.Station = stations;
		return res.status(200).send(weapon);
	} catch (e) {
		await t.rollback();
		return res.status(400).send(e.message);
	}
};


/**
 * @returns success or error message 
 */
exports.deleteWeapon = async (req, res) => {
	try {
		await Weapon.destroy({ where: { weaponID: req.params.weaponID } });
		return res.status(200).send('Succesfully weapon deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('Weapon cannot be deleted ,it has many records in database')
		}
		return res.status(400).send(e.message);
	}
};