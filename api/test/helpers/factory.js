const faker = require('faker');
const {STATION_TYPES} = require('../../utils/constants')

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

exports.createMaintainanceRecord =  (weaponID, count = 1) => {
    let maintainanceRecords = [];
    for(let i =0; i < count; i++){
        maintainanceRecords.push(
            {
                weaponID: weaponID,
                description: faker.address.city(),
                date: faker.date,
                amount: faker.count()
            }
        )
    }
    if(count == 1) return maintainanceRecords[0]
    return maintainanceRecords;
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

exports.createWeapon = (count=1, weaponModelID) => {
    let weaponModels = [];
    for(let i =0; i < count; i++){
        weapons.push(
            {
                // name: faker.lorem.words(3),
                // description: faker.lorem.words(10)
                weaponModelID: weaponModelID,
                //orderID: 
            }
        )
    }
    if(count == 1) return weapons[0]
    
    return weapons;
}

exports.createSupplier = (count = 1) => {
    let suppliers = [];
    for(let i =0; i < count; i++){
        suppliers.push(
            {
                name: faker.lorem.words(3),
                contactNumber: faker.random.number(9999999999).toString(), 
                address: faker.address.city(),
                description: faker.lorem.words(10)
            }
        )
    }
    if(count == 1) return suppliers[0]
    
    return suppliers;
}

exports.createOrder = (count = 1, supplierID) => {
    let orders = [];
    for(let i =0; i < count; i++){
        orders.push(
            {
                supplierID: supplierID,
                date: faker.date,
                totalCost: faker.random.number(1000),
                state: faker.lorem.words(3),
                description: faker.lorem.words(10)
            }
        )
    }
    if(count == 1) return orders[0]
    
    return orders;
}
