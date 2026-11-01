const { Client } = require('pg');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category_name VARCHAR (255) UNIQUE NOT NULL, category_desc VARCHAR(255) DEFAULT '-');

CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category_name VARCHAR (255) REFERENCES category(category_name), item_name VARCHAR (255) UNIQUE NOT NULL, item_desc VARCHAR(255) DEFAULT '-');

INSERT INTO category (category_name, category_desc) VALUES ('Soaps', 'List of soaps used maintain cleanliness and hygiene.'), ('Books', 'Includes both fiction and non-fiction'), ('Flags', 'Has the flags of some countries of the world.'), ('Seasons', DEFAULT);

INSERT INTO items (category_name, item_name, item_desc) VALUES 
('Soaps', 'Dove', 'This soap looks white in color.'),
('Soaps', 'Lux', 'The name has a certain connection with Linux.'),
('Soaps', 'Pears', 'Made with glycerine.'),
('Soaps', 'Park Avenue', DEFAULT),
('Books', 'The Shining', 'You will be scared out of your minds'),
('Flags', 'India', 'I am from this country.'),
('Flags', 'USA', 'This is a nice place.'),
('Flags', 'UK', 'Heard this one is nice too.'),
('Flags', 'Canada', 'Hoping to visit Toronto.'),
('Flags', 'Portugal', 'Siiiiii...'),
('Flags', 'China', 'Lenovo FTW'),
('Flags', 'Pakistan', 'We are neighbors.'),
('Books', 'Dune', 'No comments'),
('Books', 'Attack on Titan', DEFAULT);
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
