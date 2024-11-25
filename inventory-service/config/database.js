const { Sequelize } = require('sequelize');

//используйте ваши учетные данные базы данных
const sequelize = new Sequelize('inventory_db', 'postgres', 'your__password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = sequelize;
