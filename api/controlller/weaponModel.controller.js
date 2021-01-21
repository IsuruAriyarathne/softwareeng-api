var WeaponModel = require('../model/weaponModel.model');

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
    let weaponModel = {};
	try {
		weaponModel = await WeaponModel.findOne({ where: { weaponModelID: req.params.weaponModelId } });
		if (WeaponModel) {
			return res.status(404).send(weaponModel);
		} else {
			return res.status(200).send(weaponModel);
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
	try {
		weaponModel = await WeaponModel.update(
			{ ...req.body },
			{ where: { weaponModelID: req.params.weaponModelId }, returning: true }
		);
		weaponModel = await WeaponModel.findOne({ where: { weaponModelID: req.params.weaponModelId } });
		return res.status(200).send(weaponModel);
	} catch (e) {
		return res.status(400).send( e.message );
	}
};

exports.deleteWeaponModel = async (req, res) => {
	try {
		await WeaponModel.destroy({ where: { weaponModelID: req.params.weaponModelId } });
		return res.status(200).send( 'Succesfully WeaponModel deleted' );
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
