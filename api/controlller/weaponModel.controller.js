var WeaponModel = require('../model/weaponModel.model');

exports.getWeaponModels = async (req, res) => {
	let weaponModels = [];
	try {
		weaponModels = await WeaponModel.findAll();
		return res.status(200).json({ status: 200, data: weaponModels, message: 'Weapon Models succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.getWeaponModel = async (req, res) => {
    let weaponModel = {};
	try {
		weaponModel = await WeaponModel.findOne({ where: { weaponModelID: req.params.weaponModelId } });
		if (WeaponModel) {
			return res.status(404).json({ status: 404, data: weaponModel, message: 'Weapon Model not found' });
		} else {
			return res.status(200).json({ status: 200, data: weaponModel, message: 'Weapon Model succesfully retrieved' });
		}
	} catch (e) {
	    return res.status(400).json({ status: 401, message: e.message });

	}
};

exports.createWeaponModel = async (req, res) => {
	let weaponModel = req.body;
	try {
		weaponModel = await WeaponModel.create(req.body);
		return res.status(200).json({ status: 200, data: weaponModel, message: 'Weapon Model succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
		return res.status(200).json({ status: 200, data: weaponModel, message: 'Succesfully WeaponModel updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.deleteWeaponModel = async (req, res) => {
	try {
		await WeaponModel.destroy({ where: { weaponModelID: req.params.weaponModelId } });
		return res.status(200).json({ status: 200, message: 'Succesfully WeaponModel deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
