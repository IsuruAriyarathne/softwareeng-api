var WeaponModel = require('../model/weaponModel.model');
var WeaponAmmunition = require('../model/weaponAmmo.model');
const AmmunitionType = require('../model/ammunitionType.model');
const { converter } = require('../utils/objectConverter');
const sequelize = require('../config/db');
const { log } = require('debug');

exports.getWeaponModels = async (req, res) => {
	let weaponModels = [];
	try {
		weaponModels = await WeaponModel.findAll();
		return res.status(200).send(weaponModels);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getWeaponModel = async (req, res) => {
	let ammunitionTypes = {};
	try {
		ammunitionTypes = await WeaponAmmunition.findAll({
			where: { weaponModelID: req.params.weaponModelID },
			include: { model: AmmunitionType },
		});
		ammunitionTypes = ammunitionTypes.map((item) => converter(item.dataValues));
		return res.status(200).send(ammunitionTypes);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.createWeaponModel = async (req, res) => {
	let weaponModel = req.body;
	try {
		weaponModel = await WeaponModel.create(req.body);
		return res.status(200).send(weaponModel);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateWeaponModel = async (req, res) => {
	let weaponModel = {};
	let ammunitionTypes = [];
	let t = await sequelize.transaction();
	try {
		if (req.body.hasOwnProperty('AmmunitionTypes')) {
			ammunitionTypes = await WeaponAmmunition.bulkCreate(req.body.AmmunitionTypes, {
				ignoreDuplicates: true,
				transaction: t,
			});
		}
		weaponModel = await WeaponModel.update(
			{ ...req.body },
			{ where: { weaponModelID: req.params.weaponModelID }, returning: true, transaction: t }
		);
		await t.commit();
		weaponModel = await WeaponModel.findOne({ where: { weaponModelID: req.params.weaponModelID } });
		weaponModel = weaponModel.dataValues;
		ammunitionTypes = ammunitionTypes.map((item) => converter(item.dataValues));
		weaponModel.AmmunitionTypes = ammunitionTypes;
		return res.status(200).send(weaponModel);
	} catch (e) {
		await t.rollback();
		return res.status(400).send(e.message);
	}
};

exports.deleteWeaponModel = async (req, res) => {
	try {
		await WeaponModel.destroy({ where: { weaponModelID: req.params.weaponModelID } });
		return res.status(200).send('Succesfully WeaponModel deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.deleteAmmunitionType = async (req, res) => {
	try {
		await WeaponAmmunition.destroy({
			where: { weaponModelID: req.params.weaponModelID, ammoModelID: req.params.ammoModelID },
		});
		return res.status(200).send('Succesfully Ammunition Type deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
