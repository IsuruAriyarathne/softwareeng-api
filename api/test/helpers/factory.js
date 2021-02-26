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


exports.createRequestAmmunition = (count = 1,ammoModel, requestID = -1) => {
    let ammoModelIDs = ammoModel.map(item => item.ammoModelID) 
    let requestAmmo = [];

    for(let i =0; i < count; i++){
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
    if(count == 1) return requestAmmo[0]
    
    return requestAmmo;
}


exports.createRequestWeapon = (count = 1,weaponModel,requestID = -1) => {
    let weaponModelIDs = weaponModel.map(item => item.weaponModelID) 
    let requestWeapon = [];

    for(let i =0; i < count; i++){
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
    if(count == 1) return requestWeapon[0]
    
    return requestWeapon;
}

exports.createRequest = (station,weaponModel,ammoModel) => {
    let requests = [];
    
    for(let i =0; i < count; i++){
        requests.push(
            {
                date: faker.company.companyName(), 
                comments: faker.address.city(),
                state: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
                stationID: stationID 
            }
        )
    }

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
