const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products');

router.post('/add_product', productControllers.addProduct);
router.put('/edit_product/:id', productControllers.editProduct);
router.get('/all_products', productControllers.allProducts);
router.delete('/delete_product/:id', productControllers.removeProduct);
router.get('/one_product/:id', productControllers.getProduct);

module.exports = router;