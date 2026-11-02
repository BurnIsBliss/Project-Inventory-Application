const { Router } = require('express');
const inventoryController = require('../controller/inventoryController');
const inventoryRouter = Router();

inventoryRouter.get('/', inventoryController.getCategories);
inventoryRouter.get(
	'/category/:category_name',
	inventoryController.getCategoryItems,
);
inventoryRouter.get('/categoryForm', inventoryController.getCategoryForm);
inventoryRouter.post('/categoryForm', inventoryController.addNewCategory);
// inventoryRouter.post('/category/:categoryId', inventoryController.addNewItem);
// inventoryRouter.put('/category/:categoryId', inventoryController.editCategory);
// inventoryRouter.put('/item/:itemId', inventoryController.editItem);
// inventoryRouter.delete(
// 	'/category/:categoryId',
// 	inventoryController.deleteCategory,
// );
// inventoryRouter.delete('/item/:itemId', inventoryController.deleteItem);

module.exports = inventoryRouter;
