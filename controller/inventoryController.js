const db = require('../db/queries');

const getCategories = async (req, res) => {
	const categories = await db.getAllCategories();
	res.render('index', { categoryList: categories });
};

module.exports = {
	getCategories,
};
