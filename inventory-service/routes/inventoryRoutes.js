const express = require('express');
const {
  createInventory,
  getInventory,
  modifyInventory
} = require('../controllers/inventoryController');
const router = express.Router();

router.post('/inventory', createInventory);
router.put('/inventory/:id/increase/:amount', (req, res) => modifyInventory(req, res, 'increase'));
router.put('/inventory/:id/decrease/:amount', (req, res) => modifyInventory(req, res, 'decrease'));
router.get('/inventory', getInventory);

module.exports = router;

