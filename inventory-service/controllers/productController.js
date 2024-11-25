const Product = require('../models/product');
const { Op } = require('sequelize');

function handleError(res, error) {
  res.status(500).json({ error: error.message });
}

async function createProduct(req, res) {
  try {
    const { PLU, name } = req.body;
    const product = await Product.create({ PLU, name });

    res.status(201).json(product);
  } catch (error) {
    handleError(res, error);
  }
}

// Получение продуктов с фильтрацией
async function getProducts(req, res) {
  try {
    const { name, plu } = req.query;
    const filters = {};
    // Применяем фильтры для получения данных
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (plu) filters.PLU = plu;

    // Получаем данные продуктов с примененными фильтрами
    const products = await Product.findAll({ where: filters });

    res.status(200).json(products);
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = { createProduct, getProducts };
