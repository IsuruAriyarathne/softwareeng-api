const faker = require('faker');
const {STATION_TYPES} = require('../../utils/constants')
const Station = require('../../model/station.model');
const { converter } = require('../../utils/objectConverter');

const createStation = async (count = 1) => {
    let stations = [];
    for(let i =0; i < count; i++){
        stations.push(
            {
                stationName: faker.company.companyName(), 
                location: faker.address.city(),
                type: STATION_TYPES[Math.floor(Math.random() * STATION_TYPES.length)],
                contactNo: faker.random.number(9999999999), 
            }
        )
    }
    await Station.bulkCreate(stations)
    stations = stations.map(item => converter(item.dataValues))
    console.log(stations);
    return stations;
}

createStation();