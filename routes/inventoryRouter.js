const { Router } = require('express');
const inventoryController = require('../controller/inventoryController');
const inventoryRouter = Router();

// get requests
inventoryRouter.get('/', inventoryController.getCategories);
inventoryRouter.get(
	'/category/:category_name',
	inventoryController.getCategoryItems,
);
inventoryRouter.get('/categoryForm', inventoryController.getCategoryForm);
inventoryRouter.get(
	'/categoryForm/:category_name',
	inventoryController.getEditCategoryForm,
);
inventoryRouter.get('/itemForm/:category_id', inventoryController.getItemForm);
inventoryRouter.get(
	'/itemForm/:category_id/:item_name',
	inventoryController.getEditItemForm,
);
inventoryRouter.get('/:category_name', inventoryController.deleteCategory);

// post requests
inventoryRouter.post('/categoryForm', inventoryController.addNewCategory);
inventoryRouter.post(
	'/categoryForm/:category_name',
	inventoryController.editCategory,
);
inventoryRouter.post('/itemForm/:category_id', inventoryController.addNewItem);

module.exports = inventoryRouter;
