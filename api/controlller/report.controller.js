const AmmunitionType = require('../model/ammunitionType.model');
const Station = require('../model/station.model');
const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const WeaponStation = require('../model/weaponStation.model');
const { converter } = require('../utils/objectConverter');
const { groupBy, groupByAmmunition, groupByWeapon, groupRecovery } = require('../utils/groupBy');
const AmmunitionStation = require('../model/ammunitionStation.model');
const { Op } = require('sequelize');
const AmmunitionBatch = require('../model/ammunitionBatch.model');
const Recovery = require('../model/recovery.model');
const RecoveredAmmunition = require('../model/recoveredAmmo.model');
const RecoveredWeapon = require('../model/recoveredWeapon.model');
const User = require('../model/user.model');
let date = new Date();
let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * @typedef {Object} station
 *@returns {Array}: {stationID, stationName}
 */
exports.getReportStations = async () => {
	let stations = [];
	try {
		stations = await Station.findAll({ attributes: ['stationID', 'stationName'] });
		stations = stations.map((item) => item.dataValues);
		return [stations, false];
	} catch (e) {
		return [[], true];
	}
};

exports.getReportWeaponModels = async () => {
	let weaponModels = [];
	try {
		weaponModels = await WeaponModel.findAll();
		weaponModels = weaponModels.map((item) => item.dataValues);
		return [weaponModels, false];
	} catch (e) {
		return [[], true];
	}
};

exports.getReportAmmunitionTypes = async () => {
	let ammunitionTypes = [];
	try {
		ammunitionTypes = await AmmunitionType.findAll();
		ammunitionTypes = ammunitionTypes.map((item) => item.dataValues);
		return [ammunitionTypes, false];
	} catch (e) {
		return [[], true];
	}
};

exports.getReportWeapons = async (stations) => {
	let weapons = [];
	try {
		result = await WeaponStation.findAll({
			include: {
				model: Weapon,
				required: false,
				include: {
					model: WeaponModel,
					required: false,
				},
			},
			where: {
				assigned: 1,
			},
		});

		if (result.length > 0) {
			result = result.map((item) => converter(item.dataValues));
			result = groupBy(stations, result, 'weapons');
		}
		weapons = result;
		return [weapons, false];
	} catch (e) {
		return [[], true];
	}
};

exports.getReportAmmunitions = async (stations) => {
	let ammunitions = [];
	let result = [];
	try {
		result = await AmmunitionStation.findAll({
			include: {
				model: AmmunitionType,
				required: false,
			},
			where: {
				remaining: {
					[Op.gt]: 0,
				},
			},
		});
		if (result.length > 0) {
			result = result.map((item) => converter(item.dataValues));
			result = groupBy(stations, result, 'ammunitions');
		}
		ammunitions = result;
		return [ammunitions, false];
	} catch (error) {
		return [ammunitions, true];
	}
};

exports.getAvailableWeapons = async (weaponModels) => {
	let stockWeapons = [];
	let result = [];
	try {
		result = await Weapon.findAll({
			include: {
				model: WeaponModel,
				required: false,
			},
			where: {
				state: 'Available',
			},
		});
		if (result.length > 0) {
			result = result.map((item) => converter(item.dataValues));
			result = groupByWeapon(weaponModels, result);
		}

		stockWeapons = result;
		return [stockWeapons, false];
	} catch (error) {
		return [stockWeapons, true];
	}
};

exports.getReportAmmunitionStock = async (ammunitionModels) => {
	let ammunitionStock = [];
	let result = [];
	try {
		result = await AmmunitionBatch.findAll({
			include: {
				model: AmmunitionType,
				required: false,
			},
			where: {
				remain: {
					[Op.gt]: 0,
				},
			},
		});
		if (result.length > 0) {
			result = result.map((item) => converter(item.dataValues));
			result = groupByAmmunition(ammunitionModels, result);
		}
		ammunitionsStock = result;
		return [ammunitionStock, false];
	} catch (error) {
		return [ammunitionStock, true];
	}
};

exports.getReportRecoveredAmmunitions = async () => {
	let recoveredAmmunition = [];
	let result = [];
	try {
		result = await Recovery.findAll({
			where: {
				recoveryDate: {
					[Op.between]: [startDate, endDate],
				},
			},
			include: {
				model: RecoveredAmmunition,
				required: false,
				include: {
					model: AmmunitionType,
					required: false,
				},
			},
		});
		result = result.map((item) => {
			let obj = item.dataValues;
			obj.RecoveredAmmunitions = obj.RecoveredAmmunitions.map((entry) => converter(entry.dataValues));
			return obj;
		});
		recoveredAmmunition = result;
		return [recoveredAmmunition, false];
	} catch (error) {
		return [recoveredAmmunition, true];
	}
};

exports.getReportRecoveredWeapons = async () => {
	let recoveredWeapons = [];
	try {
		result = await Recovery.findAll({
			where: {
				recoveryDate: {
					[Op.between]: [startDate, endDate],
				},
			},
			include: {
				model: RecoveredWeapon,
				required: false,
				include: {
					model: WeaponModel,
					required: false,
				},
			},
		});
		result = result.map((item) => {
			let obj = item.dataValues;
			obj.RecoveredWeapons = obj.RecoveredWeapons.map((entry) => converter(entry.dataValues));
			return obj;
		});
		recoveredWeapons = result;
		return [recoveredWeapons, false];
	} catch (error) {
		return [[], true];
	}
};

exports.getEmailList = async () => {
	let emails = [];
	try {
		emails = await User.findAll({ attributes: ['email'], where: { role: 'cenofficer' } });
		return [emails, false];
	} catch (error) {
		return [[], true];
	}
};
