import express from 'express';
import db from './models';
import historyRoutes from './routes/historyRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', historyRoutes);

//Синхронизация с базой данных и запуск сервера
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});

export default app;
