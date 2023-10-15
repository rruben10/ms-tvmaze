import axios from 'axios';
import { Request, Response } from 'express';
import ISearchResult from '../interfaces/ISearchResult';

export async function getSearch(req: Request, res: Response): Promise<void> {
    try {
        const searchQuery = req.query.search_query as string;
        const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchQuery}`;
        const response = await axios.get<ISearchResult[]>(apiUrl);
        const objetos: ISearchResult[] = response.data;
        res.json(objetos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}
