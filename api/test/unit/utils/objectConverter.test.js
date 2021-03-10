// const { converter } = require('../../../utils/objectConverter');

// describe('objectConverter test', () => {
// 	it('should return the destructured object when given with dataValues', () => {
// 		let obj = {
// 			a: 1,
// 			b: 2,
// 			c: {
// 				dataValues: {
// 					d: 3,
// 					e: 4,
// 					f: {
// 						dataValues: {
// 							g: 5,
// 						},
// 					},
// 				},
// 			},
// 		};
// 		let res = converter(obj);
// 		expect(res).toEqual({
// 			a: 1,
// 			b: 2,
// 			d: 3,
// 			e: 4,
// 			g: 5,
// 		});
// 	});
// });
