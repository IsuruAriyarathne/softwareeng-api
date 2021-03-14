const createReport = require('../../../services/report');
const pdfSender = require('../../../services/pdfSender');

let server;
describe('Report generation function', () => {
	beforeAll(() => {
		server = require('../../../server');
	});
	afterAll(() => {
		server.close();
	});
	describe('server proper functioning', () => {
		beforeAll(() => {
			pdfSender.sendMail = () => {
				return true;
			};
		});
		afterAll(() => {
			jest.clearAllMocks();
		});
		it('should send report to administration', async () => {
			let result = await createReport();
			expect(result).toBe(true);
		});
	});
	// describe('server proper functioning', () => {
	// 	beforeAll(() => {
	// 		pdfSender.sendMail = () => {
	// 			throw new Error();
	// 		};
	// 	});
	// 	afterAll(() => {
	// 		jest.clearAllMocks();
	// 	});
	// 	it('should handle errors', async () => {
	// 		let result = await createReport();
	// 		expect(result).toBe(false);
	// 	});
	// });
});
