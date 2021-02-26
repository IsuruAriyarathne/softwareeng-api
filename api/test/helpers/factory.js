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
    return stations;
}

exports.createMaintainanceRecord =  (count = 1) => {
    let maintainanceRecords = [];
    for(let i =0; i < count; i++){
        maintainanceRecords.push(
            {
                // stationName: faker.company.companyName(), 
                // location: faker.address.city(),
                // type: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
                // contactNo: faker.random.number(9999999999).toString(), 
                weaponID: faker.random.number(),
                description: faker.address.city(),
                date: faker.date(),
                amount: faker.count()
            }
        )
    }
    return maintainanceRecords;
}
