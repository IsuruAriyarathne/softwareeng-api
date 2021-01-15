const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Station = require('./station.model')
const Order = require('./order.model')
const AmmunitionType = require('./ammunitionType.model')

const AmmunitionStation = sequelize.define('AmmunitionStation', {
    ammoModelID: {
			type: DataTypes.INTEGER,
			references: {
				model: AmmunitionType,
				key: 'ammoModelID',
      },
      primaryKey:true,
		},
    count: DataTypes.INTEGER,
    orderID: {
			type: DataTypes.INTEGER,
			references: {
				model: Order,
				key: 'orderID',
      },
      primaryKey:true,
		},
    stationID: {
			type: DataTypes.INTEGER,
			references: {
				model: Station,
				key: 'stationID',
      },
      primaryKey:true,
		},
    allocatedDate: DataTypes.DATEONLY,
  }, {freezeTableName: true,timestamps:false})
  
  AmmunitionStation.removeAttribute('id')
  // AmmunitionStation.hasOne(AmmunitionType)
  // AmmunitionStation.hasOne(Order)
  // AmmunitionStation.hasMany(Station)
module.exports = AmmunitionStation;