import { Sequelize } from 'sequelize';

//используйте ваши учетные данные базы данных
const sequelize = new Sequelize('history_db', 'postgres', 'your__password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

export default sequelize;
