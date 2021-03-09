const faker = require('faker');
const { STATION_TYPES, USER_TYPES } = require('../../utils/constants');

exports.createStation = (count = 1) => {
	let stations = [];
	for (let i = 0; i < count; i++) {
		stations.push({
			stationName: faker.company.companyName(),
			location: faker.address.city(),
			type: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
			contactNo: faker.random.number(9999999999).toString(),
		});
	}
	if (count == 1) return stations[0];
	return stations;
};

exports.createCompany = (count = 1) => {
	let company = [];
	for (let i = 0; i < count; i++) {
		company.push({
			name: faker.company.companyName(),
			address: faker.address.city(),
			description: faker.lorem.words(10),
			contactNumber: faker.random.number(9999999999).toString(),
		});
	}
	if (count == 1) return company[0];
	return company;
};

exports.createAmmoModel = (count = 1) => {
	let ammoModels = [];
	for (let i = 0; i < count; i++) {
		ammoModels.push({
			name: faker.lorem.words(3),
			description: faker.lorem.words(10),
		});
	}

	if (count == 1) return ammoModels[0];

	return ammoModels;
};

exports.createWeaponModel = (count = 1) => {
	let weaponModels = [];
	for (let i = 0; i < count; i++) {
		weaponModels.push({
			name: faker.lorem.words(3),
			description: faker.lorem.words(10),
		});
	}
	if (count == 1) return weaponModels[0];

	return weaponModels;
};

exports.createRequestAmmunition = (ammoModel, requestID = -1) => {
	let ammoModelIDs = [];
	if (ammoModel.length > 0) {
		ammoModelIDs = ammoModel.map((item) => item.ammoModelID);
	}
	let requestAmmo = [];
	for (let i = 0; i < ammoModel.length; i++) {
		requestAmmo.push({
			name: faker.lorem.words(3),
			amount: faker.random.number(1000),
			ammoModelID: ammoModelIDs[i],
		});
	}
	if (requestID != -1) {
		requestAmmo = requestAmmo.map((item) => (item.requestID = requestID));
	}

	return requestAmmo;
};

exports.createRequestWeapon = (weaponModel, requestID = -1) => {
	let weaponModelIDs = [];
	if (weaponModel.length > 0) {
		weaponModelIDs = weaponModel.map((item) => item.weaponModelID);
	}
	let requestWeapon = [];

	for (let i = 0; i < weaponModel.length; i++) {
		requestWeapon.push({
			name: faker.lorem.words(3),
			amount: faker.random.number(1000),
			ammoModelID: weaponModelIDs[i],
		});
	}
	if (requestID != -1) {
		requestWeapon = requestWeapon.map((item) => (item.requestID = requestID));
	}

	return requestWeapon;
};

exports.createRequest = (station, weaponModel = [], ammoModel = []) => {
	let request = {};
	request = {
		date: '2021-01-12',
		comments: faker.address.city(),
		state: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
		stationID: station.stationID,
	};

	request.WeaponRequests = this.createRequestAmmunition(ammoModel);
	request.AmmunitionRequests = this.createRequestWeapon(weaponModel);

	return request;
};

exports.createAmmunitionBatch = (count = 1) => {
	let ammunitionBatch = [];
	for (let i = 1; i <= count; i++) {
		ammunitionBatch.push({
			ammoModelID: i,
			orderID: i + 2,
			count: 100,
			remain: 90,
		});
	}
	if (count == 1) return ammunitionBatch[0];

	return ammunitionBatch;
};

exports.createUser = (station = {}, count = 1) => {
	let users = [];
	for (let i = 1; i <= count; i++) {
		users.push({
			name: faker.name.findName(),
			email: faker.internet.email(),
			role: USER_TYPES[Math.floor(Math.random() * USER_TYPES.length)],
			stationID: station.hasOwnProperty('stationID') ? station.stationID : i,
		});
	}
	if (count == 1) return users[0];
	return user;
};

exports.createWeapon = (count = 1) => {
	let weapons = [];
	for (let i = 1; i <= count; i++) {
		weapons.push({
			weaponModelID: i,
			orderID: i,
			state: faker.lorem.words(3),
		});
	}
	if (count == 1) return weapons[0];
	return weapon;
};

exports.createWeaponModel = (count = 1) => {
	let weaponModels = [];
	for (let i = 0; i < count; i++) {
		weaponModels.push({
			name: faker.name.findName(),
			description: faker.lorem.words(5),
		});
	}
	if (count == 1) return weaponModels[0];
	return weaponModels;
};

exports.createWeaponAmmunition = (weaponModelID, ammoModelID) => {
	let weaponModels = [];
	if (!Array.isArray(weaponModelID)) {
		weaponModelID = [weaponModelID];
	}
	for (let i = 0; i < weaponModelID.length; i++) {
		weaponModels.push({
			ammoModelID: ammoModelID,
			weaponModelID: weaponModelID[i],
		});
	}
	return weaponModels;
};

exports.createWeaponOrder = (count = 1, orderID = 0) => {
	let weaponOrders = [];
	for (let i = 1; i <= count; i++) {
		weaponOrders.push({
			weaponModelID: i,
			count: faker.random.number(),
			cost: faker.random.number(),
			state: 'Pending',
			description: faker.lorem.words(5),
		});
	}
	if (orderID != 0) {
		weaponOrders = weaponOrders.map((item) => {
			return { ...item, orderID: orderID };
		});
	}
	return weaponOrders;
};

exports.createAmmoOrder = (count = 1, orderID = 0) => {
	let ammoOrders = [];
	for (let i = 1; i <= count; i++) {
		ammoOrders.push({
			ammoModelID: i,
			count: faker.random.number(),
			cost: faker.random.number(),
			state: 'Pending',
			description: faker.lorem.words(5),
		});
	}
	if (orderID != 0) {
		ammoOrders = ammoOrders.map((item) => {
			return { ...item, orderID: orderID };
		});
	}
	return ammoOrders;
};

exports.createOrder = (count = 1, orderID = 0) => {
	let orders = [];
	for (let i = 1; i <= count; i++) {
		orders.push({
			supplierID: i,
			date: '2021-01-12',
			totalCost: faker.random.number(),
			state: 'Pending',
			description: faker.lorem.words(5),
		});
	}
	if (orderID != 0) {
		orders = orders.map((item) => {
			return {
				...item,
				orderID: orderID,
				AmmoOrder: this.createAmmoOrder(1, orderID),
				WeaponOrder: this.createWeaponOrder(1, orderID),
			};
		});
	}
	if (count == 1) return orders[0];
	return orders;
};

exports.createMaintainanceRecords = (count = 1) => {
	let records = [];
	for (let i = 1; i <= count; i++) {
		records.push({
			weaponID: i,
			date: '2021-01-12',
			amount: faker.random.number(),
			description: faker.lorem.words(5),
		});
	}
	if (count == 1) return records[0];
	return records;
};

exports.createRecovery = (recoveryID = 0) => {
	let recovery = {};
	recovery = {
		recoveryDate: '2020-02-28',
		description: faker.lorem.words(5),
		stationID: 1,
	};
	if (recoveryID != 0) {
		recovery.recoveryID = recoveryID;
		recovery.RecoveredAmmunitions = this.createRecoveredAmmo(recoveryID);
		recovery.RecoveredWeapons = this.createRecoveredWeapon(recoveryID);
	}
	return recovery;
};

exports.createRecoveredWeapon = (recoveryID = 0) => {
	let weapons = [];
	weapons.push({
		weaponModelID: 1,
		amount: faker.random.number(10),
	});
	if (recoveryID != 0) {
		weapons[0].recoveryID = recoveryID;
	}
	return weapons;
};

exports.createRecoveredAmmo = (recoveryID) => {
	let ammo = [];
	ammo.push({
		ammoModelID: 1,
		amount: faker.random.number(100),
	});
	if (recoveryID != 0) {
		ammo[0].recoveryID = recoveryID;
	}
	return ammo;
};
