import { Request, Response } from 'express';
import ShowService from '../services/showService';

export async function getShowById(req: Request, res: Response): Promise<void> {
  try {
    const showId = req.query.show_id as string;
    const showService = new ShowService();
    const showData = await showService.getShowById(showId);
    res.json(showData);
  } catch (error) {
    console.error('Error al obtener los datos del programa:', error);
    res.status(500).json({ error: 'Error al obtener los datos del programa' });
  }
}