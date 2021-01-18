const express = require('express');
const Station = require('../../model/station.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');
const Weapon = require('../../model/weapon.model');
const WeaponModel = require('../../model/weaponModel.model');
const WeaponStation = require('../../model/weaponStation.model');
const sequelize = require('sequelize');
const AmmunitionType = require('../../model/ammunitionType.model');
const AmmunitionStation = require('../../model/ammunitionStation.model');
const AmmunitionBatch = require('../../model/ammunitionBatch.model');
const { Op } = require('sequelize');
const { converter } = require('../../services/objectConverter');
const { groupBy, groupByAmmunition, groupByWeapon } = require('../../services/groupBy');
const router = express.Router();

router.get('/', async (req, res) => {
	let stations = [];
	let weaponModels = [];
	let ammunitionModels = [];
	let weapons = [];
	let ammunitions = [];
	let weaponStock = [];
	let ammunitionsStock = [];
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
			// console.log(result);
		})
		.then((result) => {
			result = result.map((item) => converter(item.dataValues));
			result = groupByAmmunition(ammunitionModels, result);
			ammunitionsStock = result;
			res.send({
				stations: stations,
				weapons: weapons,
				ammunitions: ammunitions,
				ammunitionsStock: ammunitionsStock,
				weaponStock: weaponStock,
			});
		})

		.catch((err) => console.log(err));
});
module.exports = router;
