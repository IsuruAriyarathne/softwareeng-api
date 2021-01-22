const AmmunitionType = require('../model/ammunitionType.model');
const RecoveredAmmunition = require('../model/recoveredAmmo.model');
const RecoveredWeapon = require('../model/recoveredWeapon.model');
const Recovery = require('../model/recovery.model');
const Station = require('../model/station.model');
const WeaponModel = require('../model/weaponModel.model');
var {converter } = require('../services/objectConverter')

exports.getRecoveriesStation = async (req, res) => {
	let recoveries = [];
	try {
		recoveries = await Recovery.findAll({
			where: { stationID: req.params.stationID },
        });
		return res.status(200).send(recoveries);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.getRecoveryStation = async (req, res) => {
    let recovery = {};
    let recoveredAmmo = [];
    let recoveredWeapons = [];
	try {
		recovery = await Recovery.findOne({
			where: { stationID: req.params.stationID, recoveryID: req.params.recoveryID },
        });
        recovery = recovery.dataValues;

		recoveredAmmo = await RecoveredAmmunition.findAll({
            where: { recoveryID: req.params.recoveryID },
			include:{model:AmmunitionType},
        });
        
		recoveredWeapons = await RecoveredWeapon.findAll({
            where: { recoveryID: req.params.recoveryID },
            include:{model: WeaponModel}
		});

        recoveredAmmo =  recoveredAmmo.map(item => converter(item.dataValues ))
        recoveredWeapons =  recoveredWeapons.map(item => converter(item.dataValues))
        
        recovery.RecoveredAmmunitions = recoveredAmmo;
        recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).send(recovery);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.updateWeaponStation = async (req, res) => {
	let weapon = {};
	try {
		weapon = await WeaponStation.update(
			{ ...req.body },
			{
				where: {
					weaponID: req.params.weaponID,
					stationID: req.body.stationID,
					assigned: 1,
				},
				returning: true,
			}
		);
		weapon = await WeaponStation.findOne({
			where: { weaponID: req.params.weaponID, stationID: req.body.stationID, assigned: 1 },
		});
		return res.status(200).send(weapon);
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
		return res.status(200).send( recoveries);
	} catch (e) {
		return res.status(400).send( e.message );
	}
};

exports.getRecovery = async (req, res) => {
	let recovery = {};
	recovery.recoveryAmmo = [];
	recovery.recoveryWeapon = [];
	try {
		recovery.recoveryAmmo = await RecoveredAmmunition.findAll({
			where: { recoveryID: req.params.recoveryID, include: { model: AmmunitionType } },
		});
		recovery.recoveryWeapon = await RecoveredWeapon.findAll({
			where: { recoveryID: req.params.recoveryID },
			include: { model: WeaponModel },
		});
		return res.status(200).send( recovery);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.updateRecovery = async (req, res) => {
    let recovery = req.body;
    let recoveredAmmunitions = [];
    let recoveredWeapons = [];
	try {
		if (recovery.hasOwnProperty('RecoveredAmmunitions')) {
			recoveredAmmunitions = [];
			recoveredAmmunitions = await RecoveredAmmunition.bulkCreate(recovery.RecoveredAmmunitions, {
				updateOnDuplicate: ['amount'],
			});
		}
		if (recovery.hasOwnProperty('RecoveredWeapons')) {
			recoveredWeapons = [];
			recoveredWeapons = await RecoveredWeapon.bulkCreate(recovery.RecoveredWeapons, {
				updateOnDuplicate: ['amount'],
			});
        }
        recovery = await Recovery.update(
			{ ...req.body },
			{ where: { recoveryID: req.params.recoveryID }, returning: true }
		);
        recovery = await Recovery.findOne({ where: { recoveryID: req.params.recoveryID } });
		recovery = recovery.dataValues
		recovery.RecoveredAmmunitions = recoveredAmmunitions;
        recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).send( recovery);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.createRecovery = async (req, res) => {
	let recovery = req.body;
	let recoveredAmmunition = [];
	let recoveredWeapons = [];
	// try {
		if (recovery.hasOwnProperty('RecoveredAmmunitions')) {
			if (recovery.RecoveredAmmunitions.length > 0) {
				recoveredAmmunition = await RecoveredAmmunition.bulkCreate(recovery.RecoveredAmmunitions);
			}
		}
		if (recovery.hasOwnProperty('RecoveredWeapons')) {
			if (recovery.RecoveredWeapons.length > 0) {
				recoveredWeapons = await RecoveredWeapon.bulkCreate(recovery.RecoveredWeapons);
			}
		}
		recovery = await Recovery.create(recovery);
		recovery = recovery.dataValues;
		recovery.RecoveredAmmunitions = recoveredAmmunition;
		recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).send(recovery);
	// } catch (e) {
	// 	return res.status(400).send( e.message);
	// }
};
