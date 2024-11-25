const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Product = require('./product');
const Inventory = require('./inventory');

// Связь между моделями
Inventory.belongsTo(Product, {
  foreignKey: 'product_id',
  targetKey: 'PLU'
});

const db = {
  sequelize,
  Sequelize,
  Product,
  Inventory,
};

module.exports = db;
