import { Request, Response } from 'express';
import History from '../models/history';
import { Op } from 'sequelize';

function handleError(res: Response, error: unknown): void {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}

//Создание записи в истории
export const createHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      product_id,
      shop_id,
      action,
      date
    } = req.body;
    const history = await History.create({
      product_id,
      shop_id,
      action,
      date
    });

    res.status(201).json(history);
  } catch (error) {
    handleError(res, error);
  }
};

//Получение историй с фильтрами и пагинацией
export const getHistories = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      shop_id,
      product_id,
      action,
      start_date,
      end_date,
      page = 1,
      limit = 10
    } = req.query;
    const filters: any = {};

    if (shop_id) filters.shop_id = shop_id;
    if (product_id) filters.product_id = product_id;
    if (action) filters.action = action;
    if (start_date || end_date) filters.date = {
      [Op.between]: [start_date || new Date(0), end_date || new Date()]
    };

    const offset: number = (Number(page) - 1) * Number(limit);
    const histories = await History.findAndCountAll({
      where: filters,
      limit: Number(limit),
      offset
    });

    res.status(200).json({
      total: histories.count,
      pages: Math.ceil(histories.count / Number(limit)),
      current_page: Number(page),
      data: histories.rows
    });
  } catch (error) {
    handleError(res, error);
  }
};
