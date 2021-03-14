var app = require('./app');
var debug = require('debug')('api:server');
var http = require('http');
const sequelize = require('./config/db');
var port =  4000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

sequelize
	.authenticate()
	.then(() => {
		// console.log('Connection established successfully.');
		if (process.env.NODE_ENV !== 'test') {
			server.listen(port);
		}
		// server.on('error', onError);
		server.on('listening', onListening);
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});



// function onError(error) {
// 	if (error.syscall !== 'listen') {
// 		throw error;
// 	}

// 	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

// 	switch (error.code) {
// 		case 'EACCES':
// 			console.error(bind + ' requires elevated privileges');
// 			process.exit(1);
// 			break;
// 		case 'EADDRINUSE':
// 			console.error(bind + ' is already in use');
// 			process.exit(1);
// 			break;
// 		default:
// 			throw error;
// 	}
// }

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}

module.exports = server;
