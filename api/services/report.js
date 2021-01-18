// const { sendMail } = require('./middleware/reportSender');
var cron = require('node-cron');
var Controller = require('../controlller/controller');
var DbObject = require('../controlller/dbObject');
const Station = require('../model/station.model');
const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const WeaponStation = require('../model/weaponStation.model');
const sequelize = require('sequelize');
const AmmunitionType = require('../model/ammunitionType.model');
const AmmunitionStation = require('../model/ammunitionStation.model');
const AmmunitionBatch = require('../model/ammunitionBatch.model');

cron.schedule('* * * * *', () => {
	// This is currently set to function every minute, change that to ever 30th day of the month
	// cron.schedule('55 23 30 * *', () => {     // This is set to function on every 30th day of the month at 11.55 pm
	/* 
  
      # ┌────────────── second (optional)
      # │ ┌──────────── minute
      # │ │ ┌────────── hour
      # │ │ │ ┌──────── day of month
      # │ │ │ │ ┌────── month
      # │ │ │ │ │ ┌──── day of week
      # │ │ │ │ │ │
      # │ │ │ │ │ │
      # * * * * * *
  
      */
	let reportBody = '';

	let stations = []; //array of objects each object of form {'stationID':,'name':}
	let weaponModels = []; //
	let ammunitionModels = [];
	let weapons = []; //array of objects. each object of form {'stationID': , "weapons":[{"weaponID","name","description",stationID","assigned",assignedDate, weaponModelID, orderID, state}, {}, {}]}
	let ammunitions = []; //array of objects. each object of form {'stationID': , "ammunitions":[{"ammoModelID",name, description,"stationID","count",allocatedDate, remaining, orderID,}, {}, {}]}
	let stockWeapons = []; //array of objects each object is of form {"weaponID","count","weaponModel"}
	let stockammunition = []; //array of objects each object is of form {"ammoModelID","count","ammoModel"}


	// const weapons = [
	// 	{ weaponID: 1, weaponModel: 'T-56' },
	// 	{ weaponID: 2, weaponModel: 'Sniper' },
	// ]; // should be generated using the database
	// const ammunition = [
	// 	{ ammoModelID: 1, ammoModel: '7.6mm' },
	// 	{ ammoModelID: 2, ammoModel: '.300 Magnum Ammo' },
	// ]; // should be generated using the database

	// const recoveredWeapons = [
	// 	{ weaponID: 1, weaponModel: 'T-56' },
	// 	{ weaponID: 2, weaponModel: 'Sniper' },
	// ]; // should be generated using the database
	// const recoverdAammunition = [
	// 	{ ammoModelID: 1, ammoModel: '7.6mm' },
	// 	{ ammoModelID: 2, ammoModel: '.300 Magnum Ammo' },
	// ]; // should be generated using the database

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
			stockWeapons = result;
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
			stockammunition = result;
			res.send({
				stations: stations,
				weapons: weapons,
				ammunitions: ammunitions,
				stockammunition: stockammunition,
				stockWeapons: stockWeapons,
			});
		})

		.catch((err) => console.log(err));

	reportBody += `<h2>Station :${station.stationName}</h2>`;

	reportBody += '<h3>Weapons</h3>';
	weapons.forEach((weapon) => {
		const count = 5; // should be generated using the database
		reportBody += `<p>${weapon.weaponModel} - ${count} units</p>`;
	});

	reportBody += '<h3>Ammunition</h3>';
	ammunition.forEach((ammo) => {
		const count = 40000; // should be generated using the database
		reportBody += `<p>${ammo.ammoModel} - ${count} bullets</p>`;
	});

	reportBody += '<h3>Recovered Weapons</h3>';
	recoveredWeapons.forEach((weapon) => {
		const count = 5; // should be generated using the database
		reportBody += `<p>${weapon.weaponModel} - ${count} units</p>`;
	});

	reportBody += '<h3>Recovered Ammunition</h3>';
	recoverdAammunition.forEach((ammo) => {
		const count = 40000; // should be generated using the database
		reportBody += `<p>${ammo.ammoModel} - ${count} bullets</p>`;
	});

	reportBody += '<br>';

	reportBody += '<h3>Stock Weapons</h3>';
	stockWeapons.forEach((weapon) => {
		reportBody += `<p>${weapon.weaponModel} - ${weapon.count}</p>`;
	});

	reportBody += '<h3>Stock Ammunition</h3>';
	stockammunition.forEach((ammo) => {
		reportBody += `<p>${ammo.ammoModel} - ${ammo.count}</p>`;
	});

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const reportSubject = `Monthly Report: ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`;

	sendMail(reportSubject, reportBody);
});
