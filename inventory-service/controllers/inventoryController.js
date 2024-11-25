const axios = require('axios');
const Inventory = require('../models/inventory');
const { Op } = require('sequelize');

// Функция для записи действий в историю
async function recordHistory(product_id, shop_id, action) {
  try {
    await axios.post('http://localhost:3001/api/history', {
      product_id: product_id,
      shop_id: shop_id,
      action: action,
      date: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to record history:', error.message);
  }
}

async function createInventory(req, res) {
  try {
    const {
      product_id,
      stock_quantity,
      order_quantity,
      shop_id
    } = req.body;

    const inventory = await Inventory.create({
      product_id,
      stock_quantity,
      order_quantity,
      shop_id
    });

    await recordHistory(product_id, shop_id, 'Created');

    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Изменения остатков на заданное количество
async function modifyInventory(req, res, type) {
  try {
    const { id, amount } = req.params;
    const inventory = await Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    const parsedAmount = parseInt(amount, 10);

    if (type === 'increase') {
      inventory.stock_quantity += parsedAmount;
      await recordHistory(inventory.product_id, inventory.shop_id, `Increased by ${parsedAmount}`);
    } else if (type === 'decrease') {
      inventory.stock_quantity -= parsedAmount;
      await recordHistory(inventory.product_id, inventory.shop_id, `Decreased by ${parsedAmount}`);
    }

    await inventory.save();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getInventory(req, res) {
  try {
    const {
      plu,
      shop_id,
      min_stock,
      max_stock,
      min_order,
      max_order
    } = req.query;

    const filters = {};

    if (plu) filters.product_id = plu;
    if (shop_id) filters.shop_id = shop_id;
    if (min_stock || max_stock) filters.stock_quantity = {
      [Op.between]: [min_stock || 0, max_stock || Infinity]
    };
    if (min_order || max_order) filters.order_quantity = {
      [Op.between]: [min_order || 0, max_order || Infinity]
    };

    const inventory = await Inventory.findAll({ where: filters });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createInventory,
  getInventory,
  modifyInventory
};
