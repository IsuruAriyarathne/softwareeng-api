var WeaponModel = require('../model/weaponModel.model');
var WeaponAmmunition = require('../model/weaponAmmo.model');
const AmmunitionType = require('../model/ammunitionType.model');
const { converter } = require('../services/objectConverter');

exports.getWeaponModels = async (req, res) => {
	let weaponModels = [];
	try {
		weaponModels = await WeaponModel.findAll();
		return res.status(200).send(weaponModels);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.getWeaponModel = async (req, res) => {
    let ammunitionTypes = {};
	try {
		ammunitionTypes = await WeaponAmmunition.findAll({ where: { weaponModelID: req.params.weaponModelID } ,include:{model:AmmunitionType }});
		ammunitionTypes = ammunitionTypes.map(item => converter(item.dataValues))
		if (ammunitionTypes) {
			return res.status(200).send(ammunitionTypes);
		} else {
			return res.status(404).send(ammunitionTypes);
		}
	} catch (e) {
	    return res.status(400).send( e.message );

	}
};

exports.createWeaponModel = async (req, res) => {
	let weaponModel = req.body;
	try {
		weaponModel = await WeaponModel.create(req.body);
		return res.status(200).send(weaponModel );
	} catch (e) {
		return res.status(400).send( e.message );
	}
};

exports.updateWeaponModel = async (req, res) => {
	let weaponModel = {};
	let ammunitionTypes = [];
	try {
		if(req.body.hasOwnProperty('AmmunitionTypes')){
			ammunitionTypes = WeaponAmmunition.bulkCreate(req.body.AmmunitionTypes,{ignoreDuplicates:true})
		}
		weaponModel = await WeaponModel.update(
			{ ...req.body },
			{ where: { weaponModelID: req.params.weaponModelID }, returning: true }
		);

		weaponModel = await WeaponModel.findOne({ where: { weaponModelID: req.params.weaponModelID } });
		weaponModel.dataValues.AmmunitionTypes = ammunitionTypes;
		return res.status(200).send(weaponModel);
	} catch (e) {
		return res.status(400).send( e.message );
	}
};

exports.deleteWeaponModel = async (req, res) => {
	try {
		await WeaponModel.destroy({ where: { weaponModelID: req.params.weaponModelID } });
		return res.status(200).send( 'Succesfully WeaponModel deleted' );
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.deleteAmmunitionType = async (req, res) => {
	try {
		await WeaponAmmunition.destroy({ where: { weaponModelID: req.params.weaponModelID,ammoModelID:req.params.ammoModelID } });
		return res.status(200).send( 'Succesfully Ammunition Type deleted' );
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
