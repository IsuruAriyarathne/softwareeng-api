const sequelize = require('../config/db');
const AmmunitionType = require('../model/ammunitionType.model');
const RecoveredAmmunition = require('../model/recoveredAmmo.model');
const RecoveredWeapon = require('../model/recoveredWeapon.model');
const Recovery = require('../model/recovery.model');
const Station = require('../model/station.model');
const WeaponModel = require('../model/weaponModel.model');
var { converter } = require('../utils/objectConverter');
const { Op } = require('sequelize');
const { groupRecoveryArr } = require('../utils/groupBy');
exports.getRecoveriesStation = async (req, res) => {
	let recoveries = [];
	let ids = [];
	let recoveredAmmo = [];
	let recoveredWeapons = [];
	try {
		recoveries = await Recovery.findAll({
			where: { stationID: req.params.stationID },
		});
		recoveries = recoveries.map((item) => converter(item.dataValues));
		console.log(recoveries);
		ids = recoveries.map((item) => item.recoveryID);
		recoveredAmmo = await RecoveredAmmunition.findAll({
			where: { recoveryID: { [Op.in]: ids } },
			include: { model: AmmunitionType },
		});
		recoveredWeapons = await RecoveredWeapon.findAll({
			where: { recoveryID: { [Op.in]: ids } },
			include: { model: WeaponModel },
		});
		recoveredAmmo = recoveredAmmo.map((item) => converter(item.dataValues));
		recoveredWeapons = recoveredWeapons.map((item) => converter(item.dataValues));
		console.log(recoveredWeapons);
		console.log(recoveredAmmo);
		recoveries = groupRecoveryArr(recoveries, recoveredAmmo, recoveredWeapons);
		return res.status(200).send(recoveries);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getRecoveryStation = async (req, res) => {
	let recovery = {};
	let recoveredAmmo = [];
	let recoveredWeapons = [];
	try {
		recoveredAmmo = await RecoveredAmmunition.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: AmmunitionType },
		});

		recoveredWeapons = await RecoveredWeapon.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: WeaponModel },
		});

		recoveredAmmo = recoveredAmmo.map((item) => converter(item.dataValues));
		recoveredWeapons = recoveredWeapons.map((item) => converter(item.dataValues));

		recovery.RecoveredAmmunitions = recoveredAmmo;
		recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).send(recovery);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

//check
exports.getRecoveries = async (req, res) => {
	let recoveries = [];
	try {
		recoveries = await Recovery.findAll({
			include: {
				model: Station,
			},
		});
		recoveries = recoveries.map((item) => converter(item.dataValues));
		return res.status(200).send(recoveries);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getRecovery = async (req, res) => {
	let recovery = {};
	recovery.RecoveredAmmunitions = [];
	recovery.RecoveredWeapons = [];
	try {
		recovery.RecoveredAmmunitions = await RecoveredAmmunition.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: AmmunitionType },
		});
		recovery.RecoveredAmmunitions = recovery.RecoveredAmmunitions.map((item) => converter(item.dataValues));
		recovery.RecoveredWeapons = await RecoveredWeapon.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: WeaponModel },
		});
		recovery.RecoveredWeapons = recovery.RecoveredWeapons.map((item) => converter(item.dataValues));
		return res.status(200).send(recovery);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateRecovery = async (req, res) => {
	let recovery = req.body;
	let recoveredAmmunitions = [];
	let recoveredWeapons = [];
	let t = await sequelize.transaction();
	try {
		if (recovery.hasOwnProperty('RecoveredAmmunitions')) {
			recoveredAmmunitions = [];
			recoveredAmmunitions = await RecoveredAmmunition.bulkCreate(recovery.RecoveredAmmunitions, {
				updateOnDuplicate: ['amount'],
				transaction: t,
			});
		}
		if (recovery.hasOwnProperty('RecoveredWeapons')) {
			recoveredWeapons = [];
			recoveredWeapons = await RecoveredWeapon.bulkCreate(recovery.RecoveredWeapons, {
				updateOnDuplicate: ['amount'],
				transaction: t,
			});
		}
		recovery = await Recovery.update(
			{ ...req.body },
			{ where: { recoveryID: req.params.recoveryID }, returning: true, transaction: t }
		);

		recovery = await Recovery.findOne({ where: { recoveryID: req.params.recoveryID } });
		await t.commit();
		recoveredWeapons = await RecoveredWeapon.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: WeaponModel },
		});
		recoveredWeapons = recoveredWeapons.map((item) => converter(item.dataValues));
		recoveredAmmunitions = await RecoveredAmmunition.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: AmmunitionType },
		});
		recoveredAmmunitions = recoveredAmmunitions.map((item) => converter(item.dataValues));
		recovery = recovery.dataValues;
		recovery.RecoveredAmmunitions = recoveredAmmunitions;
		recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).send(recovery);
	} catch (e) {
		await t.rollback();
		return res.status(400).send(e.message);
	}
};

exports.createRecovery = async (req, res) => {
	let recovery = req.body;
	let recoveredAmmunition = [];
	let recoveredWeapons = [];
	let t = await sequelize.transaction();
	try {
		recovery = await Recovery.create(recovery, { transaction: t });
		recovery = recovery.dataValues;
		if (req.body.hasOwnProperty('RecoveredAmmunitions')) {
			if (req.body.RecoveredAmmunitions.length > 0) {
				req.body.RecoveredAmmunitions = req.body.RecoveredAmmunitions.map((item) => {
					return { ...item, recoveryID: recovery.recoveryID };
				});
				recoveredAmmunition = await RecoveredAmmunition.bulkCreate(req.body.RecoveredAmmunitios, {
					transaction: t,
				});
			}
		}
		if (req.body.hasOwnProperty('RecoveredWeapons')) {
			if (req.body.RecoveredWeapons.length > 0) {
				req.body.RecoveredWeapons = req.body.RecoveredWeapons.map((item) => {
					return { ...item, recoveryID: recovery.recoveryID };
				});
				recoveredWeapons = await RecoveredWeapon.bulkCreate(req.body.RecoveredWeapons, { transaction: t });
			}
		}
		await t.commit();
		recovery.RecoveredAmmunitions = recoveredAmmunition;
		recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).send(recovery);
	} catch (e) {
		await t.rollback();
		return res.status(400).send(e.message);
	}
};

/**
 * @returns success or error message
 */
exports.deleteRecovery = async (req, res) => {
	try {
		await Recovery.destroy({ where: { recoveryID: req.params.recoveryID } });
		return res.status(200).send('Recovery succesfully deleted');
	} catch (e) {
		if (e.message.toLowerCase().includes('foreign key constraint')) {
			return res.status(400).send('Recovery cannot be deleted ,it has many records in database');
		}
		return res.status(400).send(e.message);
	}
};
/**
 * @returns success or error message
 */
exports.deleteRecoveryWeapon = async (req, res) => {
	try {
		await RecoveredWeapon.destroy({ where: { recoveryID: req.params.recoveryID,weaponModelID: req.params.weaponModelID } });
		return res.status(200).send('Recovery Weapon succesfully deleted');
	} catch (e) {
		if (e.message.toLowerCase().includes('foreign key constraint')) {
			return res.status(400).send('Recovery Weapon cannot be deleted ,it has many records in database');
		}
		return res.status(400).send(e.message);
	}
};
/**
 * @returns success or error message
 */
exports.deleteRecoveryAmmunition = async (req, res) => {
	try {
		await RecoveredAmmunition.destroy({ where: { recoveryID: req.params.recoveryID, ammoModelID: req.params.ammoModelID } });
		return res.status(200).send('Recovery Ammunition succesfully deleted');
	} catch (e) {
		if (e.message.toLowerCase().includes('foreign key constraint')) {
			return res.status(400).send('Recovery Ammunition cannot be deleted ,it has many records in database');
		}
		return res.status(400).send(e.message);
	}
};
