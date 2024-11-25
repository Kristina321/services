const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const inventoryRoutes = require('./routes/inventoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

//Middleware
app.use(bodyParser.json());

//Маршруты
app.use('/api', inventoryRoutes);
app.use('/api', productRoutes);

//Синхронизация с базой данных и запуск сервера
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

module.exports = app;
