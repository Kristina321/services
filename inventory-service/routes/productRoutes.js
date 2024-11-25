const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

// Маршрут для создания продукта
router.post('/products', createProduct);

// Маршрут для получения продуктов с фильтрацией
router.get('/products', getProducts);

module.exports = router;
