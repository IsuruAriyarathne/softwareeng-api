const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');


const Recovery = sequelize.define('Recovery', {
    recoveryID: DataTypes.INTEGER,
    recoveryDate: DataTypes.DATEONLY,
    description: DataTypes.STRING(100),
    stationID: DataTypes.INTEGER,
  }, {freezeTableName: true,timestamps:false})
  
  Recovery.removeAttribute('id')

module.exports = Recovery;