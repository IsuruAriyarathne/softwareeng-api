const ReportController = require('../../../controlller/report.controller');

describe('request controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
	});

	afterAll(async () => {
		server.close();
	});

	it('should return all the stations', async () => {
		let res = await ReportController.getReportStations();
		expect(res[1]).toBe(false);
		expect(res[0]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					stationID: expect.any(Number),
					stationName: expect.any(String)
				})
			])
		);
	});

	it('should return all weapon Models', async () => {
		let res = await ReportController.getReportWeaponModels();
		expect(res[1]).toBe(false);

	});

	it('should return all ammunition types', async () => {
		let res = await ReportController.getReportAmmunitionTypes();
		expect(res[1]).toBe(false);
		// expect(res[0]).toEqual(
		// 	expect.arrayContaining([
		// 		expect.objectContaining({
		// 			ammoModelID: expect.any(Number),
		// 			name: expect.any(String),
		// 			description: expect.any(String)
		// 		})
		// 	])
		// );	
	});

	it('should get all the weapons assigned to a station', async () => {
		let res = await ReportController.getReportWeapons();
		expect(res[1]).toBe(false);
	});
	it('should get all the ammunitions remaining in a station', async () => {
		let res = await ReportController.getReportAmmunitions();
		expect(res[1]).toBe(false);

		
	});
	it('should get all available weapons', async () => {
		let res = await ReportController.getAvailableWeapons();
		expect(res[1]).toBe(false);

		
	});

	it('should get all available ammunition stocks', async () => {
		let res = await ReportController.getReportAmmunitionStock();
		expect(res[1]).toBe(false);

		
	});

	it('should get all recovered ammuntions', async () => {
		let res = await ReportController.getReportRecoveredAmmunitions();
		expect(res[1]).toBe(false);

		
	});
	it('should get get all recovered weapons', async () => {
		let res = await ReportController.getReportRecoveredWeapons();
		expect(res[1]).toBe(false);
		
	});

	it('should get the email list of users', async () => {
		let res = await ReportController.getEmailList();
		expect(res[1]).toBe(false);
		
	});


});
