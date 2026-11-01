const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM category');
	return rows;
}

module.exports = {
	getAllCategories,
};
