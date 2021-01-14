const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const MaintainanceRecord = sequelize.define('MaintainanceRecord', {
    id: DataTypes.INTEGER,
    weaponID:DataTypes.INTEGER,
    description: DataTypes.STRING(200),
    date: DataTypes.DATEONLY,
    amount: DataTypes.FLOAT
  }, {freezeTableName: true,timestamps:false})
  

module.exports = MaintainanceRecord;