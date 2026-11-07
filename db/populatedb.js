const { Client } = require('pg');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category_name VARCHAR (255) UNIQUE NOT NULL, category_desc VARCHAR(255) DEFAULT '-');

CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, item_name VARCHAR (255) UNIQUE NOT NULL, item_desc VARCHAR(255) DEFAULT '-', category_id INTEGER REFERENCES category(id));

INSERT INTO category (category_name, category_desc) VALUES ('Soaps', 'List of soaps used to maintain cleanliness and hygiene.'), ('Books', 'Includes both fiction and non-fiction'), ('Flags', 'Has the flags of some countries of the world.'), ('Seasons', DEFAULT);

INSERT INTO items (category_id, item_name, item_desc) VALUES 
(1, 'Dove', 'This soap looks white in color.'),
(1, 'Lux', 'The name has a certain connection with Linux.'),
(1, 'Pears', 'Made with glycerine.'),
(1, 'Park Avenue', DEFAULT),
(2, 'The Shining', 'You will be scared out of your minds'),
(3, 'India', 'I am from this country.'),
(3, 'USA', 'This is a nice place.'),
(3, 'UK', 'Heard this one is nice too.'),
(3, 'Canada', 'Hoping to visit Toronto.'),
(3, 'Portugal', 'Suiiiiii...'),
(3, 'China', 'Lenovo FTW'),
(3, 'Pakistan', 'We are neighbors.'),
(2, 'Dune', 'No comments'),
(2, 'Attack on Titan', DEFAULT);
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
