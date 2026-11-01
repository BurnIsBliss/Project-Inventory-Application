const db = require('../db/queries');

const getCategories = async (req, res) => {
	const categories = await db.getAllCategories();
	res.render('index', { categoryList: categories });
};

const getCategoryItems = async (req, res) => {
	const { category_name } = req.params;
	const items = await db.getAllCategoryItems(category_name);
	res.render('items', { category_name: category_name, itemList: items });
};

module.exports = {
	getCategories,
	getCategoryItems,
};
