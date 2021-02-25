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
