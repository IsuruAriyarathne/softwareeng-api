const faker = require('faker');
const { request } = require('../../app');
const { STATION_TYPES } = require('../../utils/constants');

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
	let ammoModelIDs = ammoModel.map((item) => item.ammoModelID);
	let requestAmmo = [];

	for (let i = 0; i < ammoModel.length; i++) {
		requestAmmo.push({
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
	let weaponModelIDs = weaponModel.map((item) => item.weaponModelID);
	let requestWeapon = [];

	for (let i = 0; i < weaponModel.length; i++) {
		requestWeapon.push({
			amount: faker.random.number(1000),
			weaponModelID: weaponModelIDs[i],
		});
	}
	if (requestID != -1) {
		requestWeapon = requestWeapon.map((item) => (item.requestID = requestID));
	}

	return requestWeapon;
};

exports.createRequest = (station, weaponModel = [], ammoModel = []) => {
	let requests = {};
	requests = {
		date: faker.date,
		comments: faker.address.city(),
		state: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
		stationID: station.stationID,
	};

	requests.WeaponRequests = this.createRequestAmmunition(ammoModel);
	requests.AmmunitionRequests = this.createRequestWeapon(weaponModel);

	return requests;
};
