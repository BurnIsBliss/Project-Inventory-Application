const { Client } = require('pg');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category_name VARCHAR (255) UNIQUE NOT NULL);

CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category_name VARCHAR (255) REFERENCES category(category_name), item_name VARCHAR (255) UNIQUE NOT NULL);

INSERT INTO category (category_name) VALUES ('Soaps'), ('Books'), ('Flags');

INSERT INTO items (category_name, item_name) VALUES 
('Soaps', 'Dove'),
('Soaps', 'Lux'),
('Soaps', 'Pears'),
('Soaps', 'Park Avenue'),
('Books', 'The Shining'),
('Flags', 'India'),
('Flags', 'USA'),
('Flags', 'UK'),
('Flags', 'Canada'),
('Flags', 'Portugal'),
('Flags', 'China'),
('Flags', 'Pakistan'),
('Books', 'Dune'),
('Books', 'Attack on Titan');
`;

(async function () {
	console.log('seeding...');
	const client = new Client({
		host: process.env.HOST || process.env.HOST_LOCAL,
		user: process.env.USER || process.env.USER_LOCAL,
		database: process.env.DATABASE || process.env.DATABASE_LOCAL,
		password: process.env.PASSWORD || process.env.PASSWORD_LOCAL,
		port: Number(process.env.PORT_DB) || Number(process.env.PORT_DB_LOCAL),
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
})();
