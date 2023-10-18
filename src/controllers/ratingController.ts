import { Request, Response } from 'express';
import RatingService from '../services/ratingService';

export async function getRating(req: Request, res: Response): Promise<void> {
    try {
      const showId = parseInt(req.query.show_id as string);
  
      const ratingService = new RatingService();
      const averageRating = await ratingService.getAverageRating(showId);
  
      res.status(200).json(averageRating);
    } catch (error) {
      console.error('Error al obtener promedio de rating:', error);
      res.status(500).json({ error: 'Error al obtener promedio de rating' });
    }
  }