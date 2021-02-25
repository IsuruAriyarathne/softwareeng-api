var SequelizeMock = require('sequelize-mock');

var dbMock = new SequelizeMock();

var UserMock = dbMock.define('user', {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'test@example.com'
}, {
    instanceMethods: {
        getFullName: function () {
            return this.get('firstName') + ' ' + this.get('lastName');
        },
    },
});