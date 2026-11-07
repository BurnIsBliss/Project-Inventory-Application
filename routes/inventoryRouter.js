const { Router } = require('express');
const inventoryController = require('../controller/inventoryController');
const inventoryRouter = Router();

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

inventoryRouter.post('/categoryForm', inventoryController.addNewCategory);
inventoryRouter.post(
	'/categoryForm/:category_name',
	inventoryController.editCategory,
);
// inventoryRouter.put('/item/:itemId', inventoryController.editItem);
inventoryRouter.get('/:category_name', inventoryController.deleteCategory);
// inventoryRouter.delete('/item/:itemId', inventoryController.deleteItem);

module.exports = inventoryRouter;
