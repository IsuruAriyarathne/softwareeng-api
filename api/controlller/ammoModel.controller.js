var AmmunitionType = require('../model/ammunitionType.model');
const WeaponAmmunition = require('../model/weaponAmmo.model');
const WeaponModel = require('../model/weaponModel.model');
const { converter } = require('../services/objectConverter');

/**
 * @description  
 */
exports.getAmmoModels = async (req, res) => {
	let ammoModels = [];
	try {
		ammoModels = await AmmunitionType.findAll();
		return res.status(200).send(ammoModels);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.getAmmoModel = async (req, res) => {
    let weapons = {};
	try {
		weapons = await WeaponAmmunition.findAll({ where: { ammoModelID: req.params.ammoModelID }, include:{model: WeaponModel} });
		if (weapons) {
			weapons = weapons.map(item => converter(item.dataValues))
			return res.status(200).send(weapons);
		} else {
			return res.status(200).send(weapons);
		}
	} catch (e) {
	    return res.status(400).send(e.message);

	}
};

exports.createAmmoModel = async (req, res) => {
	let ammoModel = req.body;
	try {
		ammoModel = await AmmunitionType.create(req.body);
		return res.status(200).send(ammoModel);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateAmmoModel = async (req, res) => {
	let ammoModel = req.body;
	let weaponModels = [];
	let t = await sequelize.transaction();
	try {
		if(ammoModel.hasOwnProperty('WeaponModels')){
			weaponModels = await WeaponAmmunition.bulkCreate(ammoModel.WeaponModels,{ignoreDuplicates:true, transaction:t})
		}
		ammoModel = await AmmunitionType.update(
			{ ...req.body },
			{ where: { ammoModelID: req.params.ammoModelID }, returning: true , transaction:t}
		);
		await t.commit();
		ammoModel = await AmmunitionType.findOne({ where: { ammoModelID: req.params.ammoModelID } });
		ammoModel = ammoModel.dataValues;
		ammoModel.WeaponModels = weaponModels;
		return res.status(200).send( ammoModel);
	} catch (e) {
		await t.rollback();
		return res.status(400).send(e.message);
	}
};

exports.deleteAmmoModel = async (req, res) => {
	try {
		await AmmunitionType.destroy({ where: { ammoModelID: req.params.ammoModelID } });
		return res.status(200).send('Succesfully ammoModel deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.deleteweaponAmmunition = async (req, res) => {
	try {
		await WeaponAmmunition.destroy({ where: { ammoModelID: req.params.ammoModelID, weaponModelID: req.params.weaponModelID } });
		return res.status(200).send('Succesfully ammoModel deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
