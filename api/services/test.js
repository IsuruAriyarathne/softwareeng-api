const { groupRecovery } = require('../services/groupBy');
const ReportController = require('../controlller/report.controller');
const test = async () => {
	let recovery = []; // array of objects each object is of form {"recoveryID","recoveryDate","description","stationID","RecoveredAmmunition":[array with objects]}
	let error = Array(9).fill(false);
	[stations,error[0]] = await ReportController.getReportStations();
	[weaponModels,error[1]] = await ReportController.getReportWeaponModels();
	[ammunitionModels,error[2]] = await ReportController.getReportAmmunitionTypes();
	[weapons,error[3]] = await ReportController.getReportWeapons(stations);
	[ammunitions,error[4]] = await ReportController.getReportAmmunitions(stations);
	[weaponStock,error[5]] = await ReportController.getAvailableWeapons(weaponModels);
	[ammunitionsStock,error[6]] = await ReportController.getReportAmmunitionStock(ammunitionModels);
	[recoveredAmmunition,error[7]] = await ReportController.getReportRecoveredAmmunitions();
	[recoveredWeapons,error[8]] = await ReportController.getReportRecoveredWeapons();
    recovery = groupRecovery(recoveredAmmunition, recoveredWeapons);
    console.log(error);
    let index = error.findIndex(err =>err==true)
    console.log(index);
    console.log(stations);
    console.log(weaponModels);
    console.log(ammunitionModels);
    console.log(weapons);
    console.log(ammunitions);
    console.log(weaponStock);
    console.log(ammunitionsStock);
    console.log(recoveredAmmunition);
    console.log(recoveredWeapons);
    console.log(recovery);

};

test();