const faker = require('faker');
const { USER_TYPES } = require('../../utils/constants');
exports.createUser = () => {
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		role: USER_TYPES[Math.floor(Math.random() * USER_TYPES.length)],
		stationID: Math.floor(Math.random() * Math.floor(10)),
	};
};

exports.getUsers = () => {
	users = [];
	for (let i = 0; i < 10; i++) {
		users.push({
			dataValues: {
                officerID: i,
				name: faker.name.findName(),
				email: faker.internet.email(),
				role: USER_TYPES[Math.floor(Math.random() * USER_TYPES.length)],
				stationID: i,
			},
		});
	}
	return users;
};

