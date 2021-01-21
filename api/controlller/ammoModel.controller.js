var AmmunitionType = require('../model/ammunitionType.model');

exports.getAmmoModels = async (req, res) => {
	let ammoModels = [];
	try {
		ammoModels = await AmmunitionType.findAll();
		return res.status(200).json({ status: 200, data: ammoModels, message: 'Ammunition types succesfully Retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.getAmmoModel = async (req, res) => {
    let ammoModel = {};
	try {
		ammoModel = await AmmunitionType.findOne({ where: { ammoModelID: req.params.ammoModelId } });
		if (ammoModel) {
			return res.status(200).json({ status: 404, data: ammoModel, message: 'Ammunition Type not found' });
		} else {
			return res.status(200).json({ status: 200, data: ammoModel, message: 'Ammunition Type succesfully retrieved' });
		}
	} catch (e) {
	    return res.status(400).json({ status: 401, message: e.message });

	}
};

exports.createAmmoModel = async (req, res) => {
	let ammoModel = req.body;
	try {
		ammoModel = await AmmunitionType.create(req.body);
		return res.status(200).json({ status: 200, data: ammoModel, message: 'Ammunition Type succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.updateAmmoModel = async (req, res) => {

	let ammoModel = {};
	try {
		ammoModel = await AmmunitionType.update(
			{ ...req.body },
			{ where: { ammoModelID: req.params.ammoModelId }, returning: true }
		);
		ammoModel = await AmmunitionType.findOne({ where: { ammoModelID: req.params.ammoModelId } });
		return res.status(200).json({ status: 200, data: ammoModel, message: 'Succesfully ammoModel updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.deleteAmmoModel = async (req, res) => {
	try {
		await AmmunitionType.destroy({ where: { ammoModelID: req.params.ammoModelId } });
		return res.status(200).json({ status: 200, message: 'Succesfully ammoModel deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
