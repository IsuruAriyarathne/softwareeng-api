const faker = require('faker');
const {STATION_TYPES, USER_TYPES} = require('../../utils/constants')

exports.createStation =  (count = 1) => {
    let stations = [];
    for(let i =0; i < count; i++){
        stations.push(
            {
                stationName: faker.company.companyName(), 
                location: faker.address.city(),
                type: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
                contactNo: faker.random.number(9999999999).toString(), 
            }
        )
    }
    if(count == 1) return stations[0]
    return stations;
}

exports.createAmmoModel = (count = 1) => {
    let ammoModels = [];
    for(let i =0; i < count; i++){
        ammoModels.push(
            {
                name: faker.lorem.words(3),
                description: faker.lorem.words(10)
            }
        )
    }
    
    if(count == 1) return ammoModels[0]
    
    return ammoModels;
}


exports.createWeaponModel = (count = 1) => {
    let weaponModels = [];
    for(let i =0; i < count; i++){
        weaponModels.push(
            {
                name: faker.lorem.words(3),
                description: faker.lorem.words(10)
            }
        )
    }
    if(count == 1) return weaponModels[0]
    
    return weaponModels;
}

exports.createRequestAmmunition = (ammoModel, requestID = -1) => {
	let ammoModelIDs = []
	if(ammoModel.length>0){
		ammoModelIDs = ammoModel.map((item) => item.ammoModelID);
	}
	let requestAmmo = [];
    for(let i =0; i < ammoModel.length; i++){
        requestAmmo.push(
            {
                name: faker.lorem.words(3),
                amount: faker.random.number(1000),
                ammoModelID: ammoModelIDs[i]
            }
        )
    }
    if(requestID != -1){
        requestAmmo = requestAmmo.map(item => item.requestID = requestID)
    }
    
    return requestAmmo;
}

exports.createRequestWeapon = (weaponModel, requestID = -1) => {
	let weaponModelIDs = []
	if(weaponModel.length>0){
		weaponModelIDs = weaponModel.map((item) => item.weaponModelID);
	}
	let requestWeapon = [];

    for(let i =0; i < weaponModel.length; i++){
        requestWeapon.push(
            {
                name: faker.lorem.words(3),
                amount: faker.random.number(1000),
                ammoModelID: weaponModelIDs[i]
            }
        )
    }
    if(requestID != -1){
        requestWeapon = requestWeapon.map(item => item.requestID = requestID)
    }
    
    
    return requestWeapon;
}

exports.createRequest = (station, weaponModel = [], ammoModel = []) => {
	let request = {};
	request = {
		date: faker.date,
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
    for(let i =0; i < count; i++){
        ammunitionBatch.push(
            {
                orderID: faker.random.number(1000),
                count: faker.random.number(100),
                remain: faker.random.number(100),
            }
        )
    }
    if(count == 1) return ammunitionBatch[0]
     
    return ammunitionBatch;
}

exports.createUser =  (count = 1) => {
    let users = [];
    for(let i =0; i < count; i++){
        users.push(
            {
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: USER_TYPES[Math.floor(Math.random() * USER_TYPES.length)], 
                // stationID: faker.random.number()
                stationID: 1
            }
        )
    }
    // console.log('This is the fake user' , users) 
    if(count == 1) return users[0]
    return user;

}

exports.createWeapon =  (count = 1) => {
    let weapons = [];
    for(let i =0; i < count; i++){
        weapons.push(
            {
                weaponModelID: 1,
                orderID: 1,
                state: faker.lorem.words(3)
            }
        )
    } 
    if(count == 1) return weapons[0]
    return weapon;

}

exports.createWeaponModel =  (count = 1) => {
    let weaponModels = [];
    for(let i =0; i < count; i++){
        weaponModels.push(
            {
                name: faker.name.findName(), 
                description: faker.lorem.words(5)
            }
        )
    }
    if(count == 1) return weaponModels[0]
    return weaponModel;
}