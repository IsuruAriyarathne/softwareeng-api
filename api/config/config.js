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
	production: {
		db: {
			user: process.env.USER_PRO,
			host: process.env.HOST_PRO,
			port: process.env.DBPORT_PRO,
			dbName: process.env.DATABASE_PRO,
			password: process.env.PASSWORD_PRO,
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

