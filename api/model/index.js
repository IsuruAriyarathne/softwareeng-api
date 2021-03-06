const models = { 
    AmmunitionBatch : require('./ammunitionBatch.model'),
    AmmunitionOrder : require('./ammunitionOrder.model'),
    AmmunitionStation : require('./ammunitionStation.model'),
    AmmunitionType : require('./ammunitionType.model'),
    MaintainanceRecord : require('./maintainanceRecord.model'),
    Order : require('./order.model'),
    RecoveredAmmunition : require('./recoveredAmmo.model'),
    RecoveredWeapon : require('./recoveredWeapon.model'),
    Recovery : require('./recovery.model'),
    Request: require('./request.model'),
    RequestAmmunition : require('./requestAmmo.model'),
    RequestWeapon : require('./request.model'),
    RequestAmmunition : require('./requestAmmo.model'),
    RequestWeapon : require('./requestWeapon.model'),
    Station : require('./station.model'),
    WeaponModel: require('./weaponModel.model')
}

module.exports = models;