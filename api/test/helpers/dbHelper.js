const { converter } = require("../../utils/objectConverter");
const sequelize = require('../../config/db')
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
    let idsObj = {}
    if(!Array.isArray(idName)){
        idName = [idName]
    }
    idName.forEach(id => {
        idsObj[id] = Array.isArray(payload) ? payload.map(item => item[id]): [payload[id]] 
    })

    await model.destroy({where:idsObj});
}

exports.clearFromOrder = async () => {
    await sequelize.query("Delete from Weapon where orderID > 5")
    await sequelize.query("Delete from AmmunitionBatch where orderID > 5")
    await sequelize.query("Delete from AmmunitionOrder where orderID > 5")
    await sequelize.query("Delete from WeaponOrder where orderID > 5")
    await sequelize.query("Delete from Order where orderID > 5")
}