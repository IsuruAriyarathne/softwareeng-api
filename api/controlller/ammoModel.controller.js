var AmmunitionType = require('../model/ammunitionType.model');

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
    let ammoModel = {};
	try {
		ammoModel = await AmmunitionType.findOne({ where: { ammoModelID: req.params.ammoModelId } });
		if (ammoModel) {
			return res.status(200).send(ammoModel);
		} else {
			return res.status(200).send(ammoModel);
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

	let ammoModel = {};
	try {
		ammoModel = await AmmunitionType.update(
			{ ...req.body },
			{ where: { ammoModelID: req.params.ammoModelId }, returning: true }
		);
		ammoModel = await AmmunitionType.findOne({ where: { ammoModelID: req.params.ammoModelId } });
		return res.status(200).send( ammoModel);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.deleteAmmoModel = async (req, res) => {
	try {
		await AmmunitionType.destroy({ where: { ammoModelID: req.params.ammoModelId } });
		return res.status(200).send('Succesfully ammoModel deleted');
	} catch (e) {
		return res.status(400).send(e.message);
	}
};
