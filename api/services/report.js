// const { sendMail } = require('./middleware/reportSender');
var cron = require('node-cron');
var Controller = require('../controlller/controller');
var DbObject = require('../controlller/dbObject');
const Station = require('../model/station.model');
const WeaponStation = require('../model/weaponStation.model');
const WeaponModel = require('../model/weaponModel.model');
const Weapon = require('../model/weapon.model');
const sequelize = require('sequelize');
const AmmunitionType = require('../model/ammunitionType.model');
const AmmunitionStation = require('../model/ammunitionStation.model');
const AmmunitionBatch = require('../model/ammunitionBatch.model');

// cron.schedule('* * * * *', () => {
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
	let findAll = Controller.findAll(Station);

	let stations = [];
	findAll({ attributes: ['stationID', 'name'] })
		.then((data) => {
			stations = data;
		})
		.catch((err) => console.log(err));

	// const stations = [{stationID: 1, stationName: 'Saliyapura'}, {stationID: 2, stationName: 'Boosa'}] // should be generated using the database

	stations.forEach((station) => {
		let weapons = [];
		WeaponStation.findAll({
			include: {
				Model: Weapon,
				
				required: false,
			},
			where: {
				stationID: station.stationID,
				assigned: 1,
			},
			attributes: ['name', [sequelize.fn('COUNT', sequelize.col('weaponModelID')), 'count']],
		})
			.then((data) => {
				weapons = data;
				console.log(data);
			})
			.catch((err) => console.log(err));

		AmmunitionStation.findAll({
			include: {
				Model: AmmunitionType,
				required: false,
			},
			where: {
				stationID: station.stationID,
				state: 'Available',
			},
			attributes: ['name', [sequelize.fn('COUNT', sequelize.col('ammoMOdelID')), 'count']],
		})
			.then((data) => {
				weapons = data;
				console.log(data);
			})
			.catch((err) => console.log(err));

		// const weapons = [
		// 	{ weaponID: 1, weaponModel: 'T-56' },
		// 	{ weaponID: 2, weaponModel: 'Sniper' },
		// ]; // should be generated using the database
		// const ammunition = [
		// 	{ ammoModelID: 1, ammoModel: '7.6mm' },
		// 	{ ammoModelID: 2, ammoModel: '.300 Magnum Ammo' },
		// ]; // should be generated using the database

		const recoveredWeapons = [
			{ weaponID: 1, weaponModel: 'T-56' },
			{ weaponID: 2, weaponModel: 'Sniper' },
		]; // should be generated using the database
		const recoverdAammunition = [
			{ ammoModelID: 1, ammoModel: '7.6mm' },
			{ ammoModelID: 2, ammoModel: '.300 Magnum Ammo' },
		]; // should be generated using the database

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
	});

	let stockWeapons = [];
	Weapon.findAll({
		where: {
			state: 'Available',
		},
		attributes:[],
		include: {
			Model: WeaponModel,
			required: true,
		},
	})
	.then((data) =>{
		console.log(data);
		stockWeapons = data
	} )
	.catch(err => console.log(err))
	
	let stockammunition = []

	AmmunitionBatch.findAll({
		where: {
			state: 'Available',
		},
		attributes:[],
		include: {
			Model: AmmunitionType,
			required: true,
		},
	})
	.then((data) =>{
		console.log(data);
		stockammunition = data
	} )
	.catch(err => console.log(err))


	// const stockWeapons = [
	// 	{ weaponID: 1, weaponModel: 'T-56', count: 500 },
	// 	{ weaponID: 2, weaponModel: 'Sniper', count: 20 },
	// ]; // should be generated using the database
	// const stockammunition = [
	// 	{ ammoModelID: 1, ammoModel: '7.6mm', count: 250000 },
	// 	{ ammoModelID: 2, ammoModel: '.300 Magnum Ammo', count: 1000 },
	// ]; // should be generated using the database



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

	// sendMail(reportSubject, reportBody);
// });
