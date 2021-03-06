const { converter } = require("../../utils/objectConverter");

exports.writeToDB = async (model,payload) => {
    if(Array.isArray(payload)){
        payload = await model.bulkCreate(payload);
        payload = payload.map(item => converter(item.dataValues))
    }
    else{
        payload = await model.create(payload);
        payload = payload.dataValues;   
    }
    return payload;
}

exports.destroyFromDB = async (model,payload,idName) => {
    let where = {}
    let ids = Array.isArray(payload) ? payload.map(item => item[idName]): [payload[idName]]
    where[idName] = ids
    await model.destroy({where});
}