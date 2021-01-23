const { sendMail } = require('../middleware/reportSender');
var cron = require('node-cron');
const { groupRecovery } = require('../services/groupBy');
const ReportController = require('../controlller/report.controller');

cron.schedule('* * * * *', async () => {
	// cron.schedule('55 23 30 * *', () => {     // This is set to function on every 30th day of the month at 11.55 pm

	let reportBody = '';
	let error = Array(9).fill(false);
	// let forward = true;
	// let stations = [];
	// let weaponModels = []; //
	// let ammunitionModels = [];
	// let weapons = []; //array of objects. each object of form {'stationID': , "weapons":[{"weaponID","name","description",stationID","assigned",assignedDate, weaponModelID, orderID, state}, {}, {}]}
	// let ammunitions = []; //array of objects. each object of form {'stationID': , "ammunitions":[{"ammoModelID",name, description,"stationID","count",allocatedDate, remaining, orderID,}, {}, {}]}
	// let weaponStock = []; //array of objects each object is of form {"weaponID","count","weaponModel"}
	// let ammunitionsStock = []; //array of objects each object is of form {"ammoModelID","count","ammoModel"}
	// let recovery = []; // array of objects each object is of form {"recoveryID","recoveryDate","description","stationID","RecoveredAmmunition":[array with objects]}
	// let recoveredWeapons = [];
	// let recoveredAmmunition = [];

	try {
		[stations, error[0]] = await ReportController.getReportStations();
		[weaponModels, error[1]] = await ReportController.getReportWeaponModels();
		[ammunitionModels, error[2]] = await ReportController.getReportAmmunitionTypes();
		[weapons, error[3]] = await ReportController.getReportWeapons(stations);
		[ammunitions, error[4]] = await ReportController.getReportAmmunitions(stations);
		[weaponStock, error[5]] = await ReportController.getAvailableWeapons(weaponModels);
		[ammunitionsStock, error[6]] = await ReportController.getReportAmmunitionStock(ammunitionModels);
		[recoveredAmmunition, error[7]] = await ReportController.getReportRecoveredAmmunitions();
		[recoveredWeapons, error[8]] = await ReportController.getReportRecoveredWeapons();
		recovery = groupRecovery(recoveredAmmunition, recoveredWeapons);
		let index = error.findIndex((err) => err == true);
		if (index > 0) {
			throw new Error('Cannot retrieve data!');
		}
		let weaponArr = [];

		weapons.forEach((weapon) => {
			let dataObject = {};
			let weapArr = [];

			dataObject.stationID = weapon.stationID;
			dataObject.weapons = weapArr;
			weapon.weapons.forEach((weap) => {
				weapObject = {};
				weapObject.name = weap.name;
				weapObject.count = 1;
				if (!dataObject.weapons.includes(weapObject)) {
					weapObject.count++;
				}
				dataObject.weapons.push(weapObject);
			});

			weaponArr.push(dataObject);
		}); // weaponArr is created with each element in the format [ { name: 'Shot gun', count: 2 } ]

		let ammunitionArr = [];

		ammunitions.forEach((ammunition) => {
			let dataObject = {};
			let ammoArr = [];

			dataObject.stationID = ammunition.stationID;
			dataObject.ammunitions = ammoArr;
			ammunition.ammunitions.forEach((ammo) => {
				ammoObject = {};
				ammoObject.name = ammo.name;
				ammoObject.count = ammo.count;
				if (ammoArr.length > 0) {
					ammoArr.forEach((o) => {
						if (o.name === ammo.name) {
							o.count += ammo.count;
						} else {
							ammoArr.push(ammoObject);
						}
					});
				}
				ammoArr.push(ammoObject);
			});

			ammunitionArr.push(dataObject);
		}); // ammunitionArr is created with each element in the format[ { name: 'Bullet', count: 10 } ]

		for (i = 0; i < stations.length; i++) {
			reportBody += '<h2>Station : ' + stations[i].stationName + '</h2>';
			reportBody += '<h3>Weapons</h3>';
			weaponArr[i].weapons.forEach((weapon) => {
				reportBody += '<p>' + weapon.name + ' : ' + weapon.count + '</p>';
			});
			reportBody += '<h3>Ammunitions</h3>';
			ammunitionArr[i].ammunitions.forEach((ammunition) => {
				reportBody += '<p>' + ammunition.name + ' : ' + ammunition.count + '</p><br>';
			});
		}

		reportBody += '<br><h2>' + 'Recovered' + '</h2>';

		recovery.forEach((reco) => {
			reportBody += '<h4>' + reco.recoveryDate + ' : ' + reco.description + '</h4>';
			const recoveredItems = [];
			if (reco.RecoveredAmmunition.length > 0) {
				reco.RecoveredAmmunition.forEach((ammo) => {
					if (!recoveredItems.includes(`${ammo.name}s`)) recoveredItems.push(`${ammo.name}s`);
				});
			}
			if (reco.RecoveredWeapons.length > 0) {
				reco.RecoveredWeapons.forEach((weapo) => {
					if (!recoveredItems.includes(`${weapo.name}s`)) recoveredItems.push(`${weapo.name}s`);
				});
			}
			if (recoveredItems.length > 0) {
				recoveredItems.forEach((item) => {
					reportBody += '<p>' + item + '</p>';
				});
			}
		});

		reportBody += '<br><h2>' + 'Stocks' + '</h2>';
		reportBody += '<h3>Weapons</h3>';
		weaponStock.forEach((weapon) => {
			reportBody += '<p>' + weapon.weaponModel + ' : ' + weapon.count + '</p>';
		});
		reportBody += '<h3>Ammunitions</h3>';
		ammunitionsStock.forEach((ammo) => {
			reportBody += '<p>' + ammo.ammoModel + ' : ' + ammo.count + '</p>';
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
	} catch (error) {
		console.log('Error while retreiving data');
	}
});
