const { Pool } = require('pg');
const { loadEnvFile } = require('node:process');
loadEnvFile();

module.exports = new Pool({
	host: process.env.HOST || process.env.HOST_LOCAL,
	user: process.env.USER || process.env.USER_LOCAL,
	database: process.env.DATABASE || process.env.DATABASE_LOCAL,
	password: process.env.PASSWORD || process.env.PASSWORD_LOCAL,
	port: Number(process.env.PORT_DB) || Number(process.env.PORT_DB_LOCAL),
});
