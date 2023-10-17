import { Request, Response } from 'express';
import IShowResult from '../interfaces/IShowResult';
import {connectToDatabase} from '../database/db';
import axios from 'axios';

export async function getShowById(req: Request, res: Response): Promise<void> {
    try {
        const showId = req.query.show_id as string;

        // Conectar a la base de datos
        const db = await connectToDatabase();

        // Verifico si el showId existe en la base de datos
        const existingShow = await db.collection('shows').findOne({ id: parseInt(showId) });

        if (!existingShow) {
            // Si no existe en la base de datos, realizar la solicitud a la API externa
            const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
            const response = await axios.get<IShowResult>(apiUrl);
            const showData: IShowResult = response.data;
            res.json(showData);

            // Inserto el documento en la colección
            const result = await db.collection('shows').insertOne(showData);
            console.log('Documento insertado:', result.insertedId);
        }
        else {
            // Retorno la coleccion existente en la base de datos
            res.json(existingShow);
        }

    } catch (error) {
        console.error('Error al obtener los datos del programa:', error);
        res.status(500).json({ error: 'Error al obtener los datos del programa' });
    }
}