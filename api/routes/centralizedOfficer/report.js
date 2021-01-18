const express = require('express');
const Station = require('../../model/station.model');
const Weapon = require('../../model/weapon.model');
const WeaponModel = require('../../model/weaponModel.model');
const WeaponStation = require('../../model/weaponStation.model');
const AmmunitionType = require('../../model/ammunitionType.model');
const AmmunitionStation = require('../../model/ammunitionStation.model');
const AmmunitionBatch = require('../../model/ammunitionBatch.model');
const { Op } = require('sequelize');
const { converter } = require('../../services/objectConverter');
const { groupBy, groupByAmmunition, groupByWeapon, groupRecovery } = require('../../services/groupBy');
const Recovery = require('../../model/recovery.model');
const RecoveredAmmunition = require('../../model/recoveredAmmo.model');
const RecoveredWeapon = require('../../model/recoveredWeapon.model');
const router = express.Router();

router.get('/', async (req, res) => {
	let stations = [];
	let weaponModels = [];
	let ammunitionModels = [];
	let weapons = [];
	let ammunitions = [];
	let weaponStock = [];
	let ammunitionsStock = [];
	let recovery = [];
	let recoveredWeapons = [];
	let recoveredAmmunition = [];
	var date = new Date();
	var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
	var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	Station.findAll({ attributes: ['stationID', 'name'] })
		.then((data) => {
			stations = data;
			return stations;
		})
		.then((data) => {
			return WeaponModel.findAll();
		})
		.then((data) => {
			weaponModels = data;
			return AmmunitionType.findAll();
		})
		.then((data) => {
			ammunitionModels = data;
			return WeaponStation.findAll({
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
				// attributes: [],
			});
		})
		.then((result) => {
			result = result.map((item) => converter(item.dataValues));
			result = groupBy(stations, result, 'weapons');
			weapons = result;
			return AmmunitionStation.findAll({
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
		})
		.then((result) => {
			result = result.map((item) => converter(item.dataValues));
			result = groupBy(stations, result, 'ammunitions');
			ammunitions = result;
			return Weapon.findAll({
				include: {
					model: WeaponModel,
					required: false,
				},
				where: {
					state: 'Available',
				},
			});
		})

		.then((result) => {
			result = result.map((item) => converter(item.dataValues));
			result = groupByWeapon(weaponModels, result);
			weaponStock = result;
			return AmmunitionBatch.findAll({
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
		})
		.then((result) => {
			result = result.map((item) => converter(item.dataValues));
			result = groupByAmmunition(ammunitionModels, result);
			ammunitionsStock = result;
			return Recovery.findAll({
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
		})
		.then((result) => {
			result = result.map((item) => {
				let obj = item.dataValues;
				obj.RecoveredAmmunitions = obj.RecoveredAmmunitions.map((entry) => converter(entry.dataValues));
				return obj;
			});
			recoveredAmmunition = result;
			return Recovery.findAll({
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
		})
		.then((result) => {
			result = result.map((item) => {
				let obj = item.dataValues;
				obj.RecoveredWeapons = obj.RecoveredWeapons.map((entry) => converter(entry.dataValues));
				return obj;
			});
			recoveredWeapons = result;
			recovery = groupRecovery(recoveredAmmunition, recoveredWeapons);
			res.send({
				stations: stations,
				weapons: weapons,
				ammunitions: ammunitions,
				ammunitionsStock: ammunitionsStock,
				weaponStock: weaponStock,
				recovery: recovery,
				recoveredAmmunition: recoveredAmmunition,
				recoveredWeapons: recoveredWeapons,
			});
		})

		.catch((err) => console.log(err));
});
module.exports = router;
