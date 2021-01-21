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
		return res.status(200).json({ status: 200, data: recoveries, message: 'Recoveries successfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
	}
};

exports.getRecoveryStation = async (req, res) => {
    let recovery = {};
	try {
		recovery = await Recovery.findOne({
			where: { stationID: req.params.stationID, recoveryID: req.params.recoveryID },
        });
        recovery = recovery.dataValues;

		recovery.RecoveredAmmunition = await RecoveredAmmunition.findAll({
            where: { recoveryID: req.params.recoveryID },
            include:{model:AmmunitionType}
        });
        
		recovery.RecoveredWeapon = await RecoveredWeapon.findAll({
            where: { recoveryID: req.params.recoveryID },
            include:{model: WeaponModel}
        });
        
		return res.status(200).json({ status: 200, data: recovery, message: 'Recovery successfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
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
		return res.status(200).json({ status: 200, data: weapon, message: 'Weapon succesfully updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
		return res.status(200).json({ status: 200, data: recoveries, message: 'Recoveries successfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
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
		return res.status(200).json({ status: 200, data: recovery, message: 'Recovery succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.updateRecovery = async (req, res) => {
    let recovery = req.body;
    let recoveredAmmunitions = [];
    let recoveredWeapons = [];
	try {
		if (recovery.hasOwnProperty('RecoveredAmmunitions')) {
			recoveredAmmunitions = [];
			recoveredAmmunitions = await RecoveredAmmunition.bulkCreate(order.ammoOrder, {
				updateOnDuplicate: ['amount'],
			});
		}
		if (recovery.hasOwnProperty('RecoveredWeapons')) {
			recoveredWeapons = [];
			recoveredWeapons = await RecoveredAmmunition.bulkCreate(order.ammoOrder, {
				updateOnDuplicate: ['amount'],
			});
        }
        recovery = await Recovery.update(
			{ ...req.body },
			{ where: { recoveryID: req.params.recoveryID }, returning: true }
		);
        recovery = await Recovery.findOne({ where: { recoveryID: req.params.recoveryID } });
        recovery.RecoveredAmmunition = recoveredAmmunitions;
        recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).json({ status: 200, data: recovery, message: 'Succesfully recovery updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.createRecovery = async (req, res) => {
	let recovery = req.body;
	let recoveredAmmunition = [];
	let recoveredWeapons = [];
	try {
		if (recovery.hasOwnProperty('RecoveredAmmunition')) {
			if (recovery.RecoveredAmmunition.length > 0) {
				recoveredAmmunition = await RecoveredAmmunition.bulkCreate(recovery.RecoveredAmmunition);
			}
		}
		if (recovery.hasOwnProperty('RecoveredWeapon')) {
			if (recovery.RecoveredWeapons.length > 0) {
				recoveredWeapons = await RecoveredWeapon.bulkCreate(recovery.RecoveredWeapon);
			}
		}
		recovery = await Recovery.create(recovery);
		recovery.RecoveredAmmunition = recoveredAmmunition;
		recovery.RecoveredWeapons = recoveredWeapons;
		return res.status(200).json({ status: 200, data: recovery, message: 'Recovery successfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
