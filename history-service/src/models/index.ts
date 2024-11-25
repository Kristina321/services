import sequelize from '../config/database';
import History from './history';

//для использования в других частях приложения
const db = {
  sequelize,
  History,
};

export default db;
