import { Request, Response } from 'express';
import axios from 'axios';

export async function getShowById(req: Request, res: Response): Promise<void> {
    try {
        //const { showId } = req.params.show_id;
        const showId = req.query.show_id as string;
        const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
        const response = await axios.get<Show>(apiUrl);
        const showData: Show = response.data;
        res.json(showData);
    } catch (error) {
        console.error('Error al obtener los datos del programa:', error);
        res.status(500).json({ error: 'Error al obtener los datos del programa' });
    }
}