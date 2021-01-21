const { sendMail } = require('../middleware/reportSender');
var cron = require('node-cron');
const Station = require('../model/station.model');
const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const WeaponStation = require('../model/weaponStation.model');
const { Op } = require('sequelize');
const AmmunitionType = require('../model/ammunitionType.model');
const AmmunitionStation = require('../model/ammunitionStation.model');
const AmmunitionBatch = require('../model/ammunitionBatch.model');
const { converter } = require('../services/objectConverter');
const { groupBy, groupByAmmunition, groupByWeapon, groupRecovery } = require('../services/groupBy');
const Recovery = require('../model/recovery.model');
const RecoveredAmmunition = require('../model/recoveredAmmo.model');
const RecoveredWeapon = require('../model/recoveredWeapon.model');

cron.schedule('* * * * *', () => {
	// cron.schedule('55 23 30 * *', () => {     // This is set to function on every 30th day of the month at 11.55 pm

	let reportBody = '';
	var date = new Date();
	var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
	var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	let stations = []; //array of objects each object of form {'stationID':,'name':}
	let weaponModels = []; //
	let ammunitionModels = [];
	let weapons = []; //array of objects. each object of form {'stationID': , "weapons":[{"weaponID","name","description",stationID","assigned",assignedDate, weaponModelID, orderID, state}, {}, {}]}
	let ammunitions = []; //array of objects. each object of form {'stationID': , "ammunitions":[{"ammoModelID",name, description,"stationID","count",allocatedDate, remaining, orderID,}, {}, {}]}
	let weaponStock = []; //array of objects each object is of form {"weaponID","count","weaponModel"}
	let ammunitionsStock = []; //array of objects each object is of form {"ammoModelID","count","ammoModel"}
	let recovery = []; // array of objects each object is of form {"recoveryID","recoveryDate","description","stationID","RecoveredAmmunition":[array with objects]}
	let recoveredWeapons = [];
	let recoveredAmmunition = [];


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

			let stationtArr =[]

			stations.forEach((station) => {
				let dataObject = {}
		
				dataObject.stationID = station.stationID
				dataObject.stationName = station.name
				stationtArr.push(dataObject)
			})                                                       // stationArr is created with each element in the format { stationID: 1, stationName: 'Matara' }

			let weaponArr = []

			weapons.forEach((weapon) => {
				let dataObject = {}
				let weapArr = []

				dataObject.stationID = weapon.stationID
				dataObject.weapons = weapArr
				weapon.weapons.forEach((weap) => {
					weapObject = {}
					weapObject.name = weap.name
					weapObject.count = 1
					if(!dataObject.weapons.includes(weapObject)) {
						weapObject.count ++
					}
					dataObject.weapons.push(weapObject)
				})

				weaponArr.push(dataObject)
			})                                                        // weaponArr is created with each element in the format [ { name: 'Shot gun', count: 2 } ]                                           

			let ammunitionArr = []

			ammunitions.forEach((ammunition) => {
				let dataObject = {}
				let ammoArr = []

				dataObject.stationID = ammunition.stationID
				dataObject.ammunitions = ammoArr
				ammunition.ammunitions.forEach((ammo) => {
					ammoObject = {}
					ammoObject.name = ammo.name
					ammoObject.count = ammo.count
					if(ammoArr.length>0) {
						ammoArr.forEach((o) => {
						if(o.name===ammo.name){
							o.count += ammo.count
						} else {
							ammoArr.push(ammoObject)
						}
						})
					}
					ammoArr.push(ammoObject)
				})

				ammunitionArr.push(dataObject)
			 })                                                         // ammunitionArr is created with each element in the format[ { name: 'Bullet', count: 10 } ]


			for (i=0; i<stationtArr.length; i++){
				reportBody += '<h2>Station : ' + stationtArr[i].stationName + '</h2>'
				reportBody += '<h3>Weapons</h3>'
				weaponArr[i].weapons.forEach((weapon) => {
					reportBody += '<p>'+weapon.name + ' : ' + weapon.count + '</p>'
				})
				reportBody += '<h3>Ammunitions</h3>'
				ammunitionArr[i].ammunitions.forEach((ammunition) => {
					reportBody += '<p>'+ammunition.name + ' : ' + ammunition.count + '</p><br>'
				})
			}

			reportBody += '<br><h2>' + 'Recovered' + '</h2>'

			recovery.forEach((reco) => {
				reportBody += '<h4>'+reco.recoveryDate + ' : ' + reco.description + '</h4>' 
				const recoveredItems = []
					if(reco.RecoveredAmmunition.length>0){
						reco.RecoveredAmmunition.forEach((ammo) => {
							if(! recoveredItems.includes(`${ammo.name}s`)) recoveredItems.push(`${ammo.name}s`)
						})
					}
					if(reco.RecoveredWeapons.length>0){
						reco.RecoveredWeapons.forEach((weapo) => {
							if(! recoveredItems.includes(`${weapo.name}s`)) recoveredItems.push(`${weapo.name}s`)
						})
					}
					if(recoveredItems.length>0){
						recoveredItems.forEach((item) => {
							reportBody += '<p>' + item + '</p>'
						})
					}		
			})

			reportBody += '<br><h2>' + 'Stocks' + '</h2>'
			reportBody += '<h3>Weapons</h3>'
			weaponStock.forEach((weapon) => {
				reportBody += '<p>' + weapon.weaponModel +' : '+ weapon.count+'</p>'
			})	
			reportBody += '<h3>Ammunitions</h3>'
			ammunitionsStock.forEach((ammo) => {
				reportBody += '<p>' + ammo.ammoModel +' : '+ ammo.count+'</p>'
			})	
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

			
			// res.send({
			// 	stations: stations,
			// 	weapons: weapons,
			// 	ammunitions: ammunitions,
			// 	ammunitionsStock: ammunitionsStock,
			// 	weaponStock: weaponStock,
			// 	recovery: recovery,
			// 	recoveredAmmunition: recoveredAmmunition,
			// 	recoveredWeapons: recoveredWeapons,
			// });
		})

		.catch((err) => console.log(err));

});
