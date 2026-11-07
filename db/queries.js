const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM category');
	return rows;
}

async function returnCategoryName(category_name_or_id) {
	let rows;
	if (typeof category_name_or_id == 'number') {
		rows = await pool.query(
			'SELECT category_name FROM category WHERE id = ($1)',
			[category_name_or_id],
		);
	} else
		rows = await pool.query(
			'SELECT category_name FROM category WHERE category_name = ($1)',
			[category_name_or_id],
		);
	return rows.rows;
}

async function returnCategoryDetails(category_name) {
	const { rows } = await pool.query(
		'SELECT category_name, category_desc FROM category WHERE category_name = ($1)',
		[`${category_name}`],
	);
	return rows;
}

async function getAllCategoryItems(category_name) {
	const { rows } = await pool.query(
		'SELECT item_name, item_desc FROM items WHERE category_id = (SELECT id FROM category WHERE category_name = ($1));',
		[`${category_name}`],
	);
	return rows;
}

async function insertCategory(category_name, category_description) {
	if (category_description)
		await pool.query(
			'INSERT INTO category (category_name, category_desc) VALUES (($1), ($2))',
			[category_name, category_description],
		);
	else
		await pool.query('INSERT INTO category (category_name) VALUES (($1))', [
			category_name,
		]);
}

async function insertItem(category_id, item_name, item_description) {
	if (item_description) {
		await pool.query(
			'INSERT INTO items (category_id, item_name, item_desc) VALUES (($1), ($2), ($3))',
			[category_id, item_name, item_description],
		);
	} else {
		await pool.query(
			'INSERT INTO items (category_id, item_name) VALUES (($1), ($2))',
			[category_id, item_name],
		);
	}
}

async function checkDuplicateItem(category_id, name) {
	const { rows } = await pool.query(
		'SELECT item_name FROM items WHERE category_id = ($1) AND item_name=($2)',
		[category_id, name],
	);
	return rows;
}

async function getCategoryId(category_name) {
	const { rows } = await pool.query(
		'SELECT id from category WHERE category_name = ($1)',
		[category_name],
	);
	return rows;
}

async function deleteCategory(category_name) {
	const { rows } = await pool.query(
		`SELECT * FROM items WHERE category_id = (SELECT id FROM category WHERE category_name = ($1)) LIMIT 1`,
		[`${category_name}`],
	);
	if (rows.length) {
		await pool.query(
			'DELETE FROM items WHERE category_id = (SELECT id FROM category WHERE category_name = ($1))',
			[`${category_name}`],
		);
		await pool.query('DELETE FROM category WHERE category_name = ($1)', [
			`${category_name}`,
		]);
	} else {
		await pool.query('DELETE FROM category WHERE category_name = ($1)', [
			`${category_name}`,
		]);
	}
}

async function editCategory(
	old_category_name,
	category_desc,
	new_category_name,
) {
	await pool.query(
		'UPDATE category SET category_name = ($1), category_desc = ($2) WHERE category_name = ($3)',
		[`${new_category_name}`, `${category_desc}`, `${old_category_name}`],
	);
}

module.exports = {
	getAllCategories,
	getAllCategoryItems,
	insertCategory,
	returnCategoryName,
	returnCategoryDetails,
	deleteCategory,
	editCategory,
	insertItem,
	getCategoryId,
	checkDuplicateItem,
};
