const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

// Функция для создания поля модели
const createField = (type, allowNull = false, options = {}) => ({
  type,
  allowNull,
  ...options
});

const Inventory = sequelize.define('Inventory', {
  inventory_id: createField(DataTypes.INTEGER, false, {
    primaryKey: true,
    autoIncrement: true
  }),
  stock_quantity: createField(DataTypes.INTEGER, false), // количество товара на полке
  order_quantity: createField(DataTypes.INTEGER, false), // количество товара в заказе
  shop_id: createField(DataTypes.STRING, false),
  product_id: createField(DataTypes.STRING, false, {
    references: {
      model: Product,
      key: 'PLU'
    }
  }),
  createdAt: createField(DataTypes.DATE, false, { defaultValue: DataTypes.NOW }),
  updatedAt: createField(DataTypes.DATE, false, { defaultValue: DataTypes.NOW })
});

//Устанавливаем связь с моделью Product
Inventory.belongsTo(Product, {
  foreignKey: 'product_id',
  targetKey: 'PLU'
});

module.exports = Inventory;
