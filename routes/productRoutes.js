const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');
const isAuthenticated = require('../middlewares/authMiddleware');

//add products page
router.get('/add-product', isAuthenticated, productController.addProductPage)

//add product - post
router.post('/add-product', isAuthenticated, upload.single('file'), productController.addProduct)

//edit product page
router.get('/edit-product/:pid', isAuthenticated, productController.editProductPage)

//edit product
router.post('/edit-product', isAuthenticated, upload.single('file'), productController.editProduct)

//delete a product
router.get('/delete-product/:id', isAuthenticated, productController.deleteProduct) 

//publish status
router.get('/publish-status/:id/:action', isAuthenticated, productController.publishStatus)

//manage products page
router.get('/manage-products', isAuthenticated, productController.manageProductsPage)

module.exports = router
