const ReportController = require('../../../controlller/report.controller');
const Model = require('../../../model/');
const { mockErrorMethod } = require('../../helpers/exceptionThrow');

describe('report controller', () => {
	beforeAll(async () => {
		server = require('../../../server');
	});

	afterAll(async () => {
		server.close();
	});
	describe('functionality', () => {
		it('should return all the stations', async () => {
			let res = await ReportController.getReportStations();
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						stationID: expect.any(Number),
						stationName: expect.any(String),
					}),
				])
			);
		});

		it('should return all weapon Models', async () => {
			let res = await ReportController.getReportWeaponModels();
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						weaponModelID: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should return all ammunition types', async () => {
			let res = await ReportController.getReportAmmunitionTypes();
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						ammoModelID: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
					}),
				])
			);
		});

		it('should get all the weapons assigned to a station', async () => {
			let res = await ReportController.getReportWeapons([{ stationID: 1 }, { stationID: 2 }]);
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						stationID: expect.any(Number),
						weapons: expect.any(Array),
					}),
				])
			);
		});

		it('should get all the ammunitions remaining in a station', async () => {
			let res = await ReportController.getReportAmmunitions([{ stationID: 1 }, { stationID: 2 }]);
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						stationID: expect.any(Number),
						ammunitions: expect.any(Array),
					}),
				])
			);
		});

		it('should get all available weapons', async () => {
			let res = await ReportController.getAvailableWeapons([{ weaponModelID: 1 }, { weaponModelID: 2 }]);
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						weaponID: expect.any(Number),
						count: expect.any(Number),
					}),
				])
			);
		});

		it('should get all available ammunition stocks', async () => {
			let res = await ReportController.getReportAmmunitionStock([{ ammoModelID: 1 }, { ammoModelID: 2 }]);
			expect(res[1]).toBe(false);
			expect(res[0]).toEqual(expect.any(Array));
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
			expect(res[0]).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						email: expect.any(String),
					}),
				])
			);
		});
	});

	describe('error handling', () => {
		beforeAll(() => {
			mockErrorMethod(Model.Station);
			mockErrorMethod(Model.WeaponModel);
			mockErrorMethod(Model.AmmunitionType);
			mockErrorMethod(Model.WeaponStation);
			mockErrorMethod(Model.AmmunitionStation);
			mockErrorMethod(Model.Weapon);
			mockErrorMethod(Model.AmmunitionBatch);
			mockErrorMethod(Model.Recovery);
			mockErrorMethod(Model.User);
		});
		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return true message on sequelize errors for get stations', async () => {

			let res = await ReportController.getReportStations();

			expect(res[1]).toBe(true);
		});

		it('should return true on get all weapon Models for errors', async () => {

			let res = await ReportController.getReportWeaponModels();

			expect(res[1]).toBe(true);
		});

		it('should return true on get all ammunition types', async () => {

			let res = await ReportController.getReportAmmunitionTypes();

			expect(res[1]).toBe(true);
		});

		it('should return true on get weapons of stations', async () => {

			let res = await ReportController.getReportWeapons();

			expect(res[1]).toBe(true);
		});

		it('should return true on get available ammunition types', async () => {

			let res = await ReportController.getReportAmmunitions();

			expect(res[1]).toBe(true);
		});

		it('should return true on get available weapon stock', async () => {

			let res = await ReportController.getAvailableWeapons();

			expect(res[1]).toBe(true);
		});
		it('should return true on get available ammunition stock', async () => {

			let res = await ReportController.getReportAmmunitionStock();

			expect(res[1]).toBe(true);
		});
		it('should return true on get recovered ammunition stock', async () => {

			let res = await ReportController.getReportRecoveredAmmunitions();

			expect(res[1]).toBe(true);
		});
		it('should return true on get recovered weapon stock', async () => {

			let res = await ReportController.getReportRecoveredWeapons();

			expect(res[1]).toBe(true);
		});
		it('should return true on get email list', async () => {

			let res = await ReportController.getEmailList();

			expect(res[1]).toBe(true);
		});
	});
});
