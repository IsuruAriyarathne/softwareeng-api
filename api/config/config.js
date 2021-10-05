require('dotenv').config();
const config = {
	test: {
		db: {
			user: process.env.USER_TEST,
			host: process.env.HOST_TEST,
			port: process.env.DBPORT_TEST,
			dbName: process.env.DATABASE_TEST,
			password: process.env.PASSWORD_TEST,
		},
	},
	dev: {
		db: {
			user: process.env.USER_DEV,
			host: process.env.HOST_DEV,
			port: process.env.DBPORT_DEV,
			dbName: process.env.DATABASE_DEV,
			password: process.env.PASSWORD_DEV
		},
	},
	mail: {
		clinetID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		redirectUri: process.env.REDIRECT_URI,
		refreshToken: process.env.REFRESH_TOKEN,
		mail: process.env.MAIL,
	},
    secretKey: process.env.JWT_SECRET
};

module.exports = config;

