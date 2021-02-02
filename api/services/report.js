// const { sendMail } = require('../middleware/pdfSender');
// var cron = require('node-cron');
// const { groupRecovery } = require('../services/groupBy');
// const ReportController = require('../controlller/report.controller');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');

// // cron.schedule('* * * * *', async () => {
// cron.schedule('30 18 30 * *', () => {     // This is set to function on every 30th day of the month at 11.55 pm
// 	let reportBody = '';
// 	let error = Array(9).fill(false);
// 	let doc = new PDFDocument();
// 	doc.pipe(fs.createWriteStream("SLFMonthlyReport.pdf"));

// 	try {
// 		[stations, error[0]] = await ReportController.getReportStations();
// 		[weaponModels, error[1]] = await ReportController.getReportWeaponModels();
// 		[ammunitionModels, error[2]] = await ReportController.getReportAmmunitionTypes();
// 		[weapons, error[3]] = await ReportController.getReportWeapons(stations);
// 		[ammunitions, error[4]] = await ReportController.getReportAmmunitions(stations);
// 		[weaponStock, error[5]] = await ReportController.getAvailableWeapons(weaponModels);
// 		[ammunitionsStock, error[6]] = await ReportController.getReportAmmunitionStock(ammunitionModels);
// 		[recoveredAmmunition, error[7]] = await ReportController.getReportRecoveredAmmunitions();
// 		[recoveredWeapons, error[8]] = await ReportController.getReportRecoveredWeapons();
// 		[cenOfficerList, error[9]] =  await ReportController.getEmailList();
// 		recovery = groupRecovery(recoveredAmmunition, recoveredWeapons);
// 		let index = error.findIndex((err) => err == true);
// 		if (index > 0) {
// 			throw new Error('Cannot retrieve data!');
// 		}
// 		let weaponArr = [];

// 		weapons.forEach((weapon) => {
// 			let dataObject = {};
// 			let weapArr = [];

// 			dataObject.stationID = weapon.stationID;
// 			dataObject.weapons = weapArr;
// 			weapon.weapons.forEach((weap) => {
// 				weapObject = {};
// 				weapObject.name = weap.name;
// 				weapObject.count = 1;
// 				if (!dataObject.weapons.includes(weapObject)) {
// 					dataObject.weapons.push(weapObject);
// 				} else {
// 					dataObject.weapons.splice(dataObject.weapons.indexOf(weapObject),1)
// 					weapObject.count++;
// 					dataObject.weapons.push(weapObject);
// 			}
// 			});

// 			weaponArr.push(dataObject);
// 		}); // weaponArr is created with each element in the format [ { name: 'Shot gun', count: 2 } ]

// 		let ammunitionArr = [];

// 		ammunitions.forEach((ammunition) => {
// 			let dataObject = {};
// 			let ammoArr = [];

// 			dataObject.stationID = ammunition.stationID;
// 			dataObject.ammunitions = ammoArr;
// 			ammunition.ammunitions.forEach((ammo) => {
// 				ammoObject = {};
// 				ammoObject.name = ammo.name;
// 				ammoObject.count = ammo.count;
// 				if (ammoArr.length > 0) {
// 					ammoArr.forEach((o) => {
// 						if (o.name === ammo.name) {
// 							o.count += ammo.count;
// 						} else {
// 							ammoArr.push(ammoObject);
// 						}
// 					});
// 				}
// 				ammoArr.push(ammoObject);
// 			});

// 			ammunitionArr.push(dataObject);
// 		}); // ammunitionArr is created with each element in the format[ { name: 'Bullet', count: 10 } ]

// 		for (i = 0; i < stations.length; i++) {
// 			// reportBody += '<h2>Station : ' + stations[i].stationName + '</h2>';
// 			reportBody += 'Station : ' + stations[i].stationName +'\n\n';
// 			reportBody += 'Weapons\n';
// 			weaponArr[i].weapons.forEach((weapon) => {
// 				reportBody +=   weapon.name + ' : ' + weapon.count+'\n';
// 			});
// 			reportBody += 'Ammunitions\n';
// 			ammunitionArr[i].ammunitions.forEach((ammunition) => {
// 				reportBody +=  ammunition.name + ' : ' + ammunition.count +'\n';
// 			});
// 			reportBody += '\n\n';
// 		}

// 		reportBody += '\n' + 'Recovered' + '\n';

// 		recovery.forEach((reco) => {
// 			reportBody += '\n' + reco.recoveryDate + ' : ' + reco.description + '\n';
// 			const recoveredItems = [];
// 			if (reco.RecoveredAmmunitions.length > 0) {
// 				reco.RecoveredAmmunitions.forEach((ammo) => {
// 					if (!recoveredItems.includes(`${ammo.name}s`)) recoveredItems.push(`${ammo.name}s`);
// 				});
// 			}
// 			if (reco.RecoveredWeapons.length > 0) {
// 				reco.RecoveredWeapons.forEach((weapo) => {
// 					if (!recoveredItems.includes(`${weapo.name}s`)) recoveredItems.push(`${weapo.name}s`);
// 				});
// 			}
// 			if (recoveredItems.length > 0) {
// 				recoveredItems.forEach((item) => {
// 					reportBody +=   item + '\n';
// 				});
// 			}
// 		});


// 		reportBody += '\n' + 'Stocks' + '\n';
// 		reportBody += '\nWeapons\n';
// 		weaponStock.forEach((weapon) => {
// 			reportBody += weapon.weaponModel + ' : ' + weapon.count + '\n';
// 		});
// 		reportBody += '\nAmmunitions\n';
// 		ammunitionsStock.forEach((ammo) => {
// 			reportBody +=  ammo.ammoModel + ' : ' + ammo.count + '\n';
// 		});
// 		const monthNames = [
// 			'January',
// 			'February',
// 			'March',
// 			'April',
// 			'May',
// 			'June',
// 			'July',
// 			'August',
// 			'September',
// 			'October',
// 			'November',
// 			'December',
// 		];
// 		const reportSubject = `Monthly Report: ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`;

// 		let mailList = []
// 		cenOfficerList.forEach((officer) => {
// 			mailList.push(officer.dataValues.email)
// 		})

// 		doc
//   			.fontSize(10)
// 			  .text(reportBody, 100, 100);
// 		doc.end();
// 		sendMail(reportSubject, 'Please find attached herewith',mailList.join());
// 	} catch (error) {
// 		console.log(error.message);
// 		console.log('Error while retreiving data');
// 	}
// });
