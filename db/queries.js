const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM category');
	return rows;
}

async function getAllCategoryItems(category_name) {
	const { rows } = await pool.query(
		'SELECT item_name, item_desc FROM items WHERE category_name LIKE ($1);',
		[`${category_name}`],
	);
	return rows;
}

module.exports = {
	getAllCategories,
	getAllCategoryItems,
};
