const Sequelize = require('sequelize');

const path = 'mysql://TMeU6ua5df:kp69GbxwjU@remotemysql.com:3306/TMeU6ua5df';
const sequelize = new Sequelize(path);

sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  sequelize.close();
});


const User = sequelize.define('User', {
  officerId: Sequelize.STRING,
  name: Sequelize.TEXT,
  location: Sequelize.TEXT,
  password: Sequelize.TEXT,
  role: Sequelize.TEXT,
  stationID: Sequelize.TEXT,
}, {freezeTableName: true,timestamps:false})

User. removeAttribute('id')


let data = async () =>  User.findAll()
User.findAll()
.then(data => console.log(data))
.catch( err => console.log(err))

module.exports = data;
// console.log(data);