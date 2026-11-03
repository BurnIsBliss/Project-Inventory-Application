const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const validateInput = [
	body('name')
		.trim()
		.isAlpha()
		.withMessage('Name should only contain alphabets.')
		.isLength({ min: 1, max: 20 })
		.withMessage('Name should be b/w 1 and 20 characters.'),
	body('description')
		.trim()
		.isLength({ max: 200 })
		.withMessage('Description should be less than 200 characters.'),
];

const getCategories = async (req, res) => {
	const categories = await db.getAllCategories();
	res.render('index', { categoryList: categories });
};

const getCategoryItems = async (req, res) => {
	const { category_name } = req.params;
	const items = await db.getAllCategoryItems(category_name);
	res.render('items', { category_name: category_name, itemList: items });
};

const getCategoryForm = (req, res) => {
	res.render('categoryForm');
};

const addNewCategory = [
	validateInput,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('categoryForm', {
				errors: errors.array(),
			});
		}
		const { name, description } = matchedData(req);
		const rows = await db.returnCategoryName(name);
		if (!rows) {
			await db.insertCategory(name, description);
			res.redirect('/');
		} else
			return res.status(400).render('categoryForm', {
				errors: [{ msg: `The name, ${name} already exists.` }],
			});
	},
];

const deleteCategory = async (req, res) => {
	const { category_name } = req.params;
	await db.deleteCategory(category_name);
	res.status(200).redirect('/');
};

module.exports = {
	getCategories,
	getCategoryItems,
	getCategoryForm,
	addNewCategory,
	deleteCategory,
};
