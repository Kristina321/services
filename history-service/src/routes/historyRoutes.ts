import { Router } from 'express';
import { createHistory, getHistories } from '../controllers/historyController';

const router = Router();

//Маршрут для создания записи в истории
router.post('/history', createHistory);

//Маршрут для получения историй с фильтрами и пагинацией
router.get('/history', getHistories);

export default router;
