const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const WeaponStation = require('../model/weaponStation.model');
var { converter } = require('../services/objectConverter');
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
		return res.status(200).json({ status: 200, data: weapons, message: 'Weapons succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
			return res.status(401).json({ status: 401, data: weapon, message: 'Unauthorized' });
		}

		return res.status(200).json({ status: 200, data: weapon, message: 'Weapon succesfully updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

//check
exports.getWeapons = async (req, res) => {
	let weapons = {};
	try {
		weapons = await Weapon.findAll({
			include: {
				model: WeaponModel,
				include: {
					model: Order,
				},
			},
		});
		return res.status(200).json({ status: 200, data: weapons, message: 'Weapons succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
	}
};

exports.getWeapon = async (req, res) => {
	let weapon = {};
	try {
		weapon = await WeaponStation.findAll({
			where: {
				weaponID: req.params.weaponID,
				assigned: 1,
			},
			include: {
				model: Station,
			},
		});
		return res.status(200).json({ status: 200, data: weapon, message: 'Ammunition Batch succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
	}
};

exports.createWeapon = async (req, res) => {
	let weapon = req.body;
	try {
		weapon = await Weapon.create(req.body);
		return res.status(200).json({ status: 200, data: weapon, message: 'Weapon succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.updateWeapon = async (req, res) => {
	let weapon = {};
	try {
		weapon = await Weapon.update({ ...req.body }, { where: { weaponID: req.params.weaponID }, returning: true });
		weapon = await weapon.findOne({ where: { weaponModel: req.params.weaponModel } });
		return res.status(200).json({ status: 200, data: weapon, message: 'Weapon succesfully updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
