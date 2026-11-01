const { Router } = require('express');
const inventoryController = require('../controller/inventoryController');
const inventoryRouter = Router();

inventoryRouter.get('/', inventoryController.getCategories);
// inventoryRouter.get(
// 	'/category/:categoryId',
// 	inventoryController.getCategoryItems,
// );
// inventoryRouter.get('/item/:itemId', inventoryController.getItem);
// inventoryRouter.post('/', inventoryController.addNewCategory);
// inventoryRouter.post('/category/:categoryId', inventoryController.addNewItem);
// inventoryRouter.put('/category/:categoryId', inventoryController.editCategory);
// inventoryRouter.put('/item/:itemId', inventoryController.editItem);
// inventoryRouter.delete(
// 	'/category/:categoryId',
// 	inventoryController.deleteCategory,
// );
// inventoryRouter.delete('/item/:itemId', inventoryController.deleteItem);

module.exports = inventoryRouter;
