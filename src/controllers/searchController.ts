import { Request, Response } from 'express';
import SearchService from '../services/searchService';

export async function getSearch(req: Request, res: Response): Promise<void> {
  try {
    const searchQuery = req.query.search_query as string;
    const searchService = new SearchService();
    const searchResults = await searchService.searchShows(searchQuery);
    res.json(searchResults);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
}