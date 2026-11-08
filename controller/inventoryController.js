const db = require('../db/queries');
const { body, validationResult, matchedData } = require('express-validator');
const { loadEnvFile, title } = require('node:process');
loadEnvFile();

const validateInput = [
	body('name')
		.trim()
		.isAlpha('en-US', { ignore: ' ' })
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
	const category_id = await db.getCategoryId(category_name);
	const items = await db.getAllCategoryItems(category_name);
	res.render('items', {
		category_name: category_name,
		itemList: items,
		category_id: category_id[0].id,
	});
};

const getCategoryForm = (req, res) => {
	res.render('categoryForm', {
		title: 'Add Category',
		category_name: '',
		category_desc: '',
		old_category_name: '',
	});
};

const addNewCategory = [
	validateInput,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('categoryForm', {
				title: 'Add Category',
				category_name: '',
				category_desc: '',
				old_category_name: '',
				errors: errors.array(),
			});
		}
		const { name, description } = matchedData(req);
		const rows = await db.returnCategoryName(name);
		if (!rows.length) {
			await db.insertCategory(name, description);
			res.redirect('/');
		} else
			return res.status(400).render('categoryForm', {
				title: 'Add Category',
				category_name: '',
				category_desc: '',
				old_category_name: '',
				errors: [
					{ msg: `The category name '${name}' already exists.` },
				],
			});
	},
];

const getEditCategoryForm = async (req, res) => {
	const { category_name } = req.params;
	const row = await db.returnCategoryDetails(category_name);
	res.render('categoryForm', {
		title: 'Edit Category',
		category_desc: row[0].category_desc,
		category_name: row[0].category_name,
		old_category_name: row[0].category_name,
	});
};

const getItemForm = async (req, res) => {
	const { category_id } = req.params;
	res.render('itemForm', {
		title: 'Add new item',
		item_name: '',
		item_desc: '',
		category_id: category_id,
		old_item_name: '',
	});
};

const addNewItem = [
	validateInput,
	async (req, res) => {
		const errors = validationResult(req);
		const { category_id } = req.params;
		if (!errors.isEmpty()) {
			return res.status(400).render('itemForm', {
				title: 'Add new item',
				item_name: '',
				item_desc: '',
				old_item_name: '',
				category_id: category_id,
				errors: errors.array(),
			});
		}
		const { name, description } = matchedData(req);
		const rows = await db.checkDuplicateItem(category_id, name);
		if (!rows.length) {
			await db.insertItem(category_id, name, description);
			const category_name = await db.returnCategoryName(
				Number(category_id),
			);
			res.redirect(`/category/${category_name[0].category_name}`);
		} else {
			const category_name = await db.returnCategoryName(
				Number(category_id),
			);
			return res.status(400).render('itemForm', {
				title: 'Add new item',
				item_name: '',
				item_desc: '',
				old_item_name: '',
				category_id: category_id,
				errors: [
					{
						msg: `The item '${name}' already exists in '${category_name[0].category_name}'.`,
					},
				],
			});
		}
	},
];

const editCategory = [
	validateInput,
	async (req, res) => {
		const errors = validationResult(req);
		const { category_name } = req.params;
		const { name, description } = matchedData(req);
		const currentCategoryDetails =
			await db.returnCategoryDetails(category_name);
		const old_category_name = req.body.old_category_name;
		if (!errors.isEmpty()) {
			return res.status(400).render('categoryForm', {
				title: 'Edit Category',
				category_desc: currentCategoryDetails[0].category_desc,
				category_name: category_name,
				old_category_name: old_category_name,
				errors: errors.array(),
			});
		}
		const rows = await db.returnCategoryName(name);
		if (!rows.length || old_category_name == name) {
			await db.editCategory(old_category_name, description, name);
			res.redirect('/');
		} else
			return res.status(400).render('categoryForm', {
				title: 'Edit Category',
				category_name: category_name,
				category_desc: currentCategoryDetails[0].category_desc,
				old_category_name: old_category_name,
				errors: [
					{ msg: `The category name '${name}' already exists.` },
				],
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
	getEditCategoryForm,
	editCategory,
	getItemForm,
	addNewItem,
};
