import { Request, Response } from 'express';
import { connectToDatabase } from '../database/db';
const { ObjectId } = require('mongodb');
import axios from 'axios';
import Show from '../models/showModel';

export async function postCommentShow(req: Request, res: Response): Promise<void> {
    try {
        const showId = parseInt(req.body.id as string);
        const comment = req.body.comment as string;
        const rating = parseInt(req.body.rating as string);

        if (isNaN(rating) || rating < 0 || rating > 5) {
            res.status(400).json({ error: 'El rating debe estar entre 0 y 5.' });
            return;
        }

        const objectId = new ObjectId(showId);

        const db = await connectToDatabase();
        const existingShow = await db.collection('shows').findOne({ id: showId });

        if (!existingShow) {

            const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
            const response = await axios.get(apiUrl);
            const showData = response.data;

            const nuevosDatos = {
                $push: {
                    comments: {
                        comment: comment,
                        rating: rating
                    }
                }
            };

            // Inserto el documento en la colección
            await db.collection('shows').insertOne(showData);
            await Show.findByIdAndUpdate(objectId, nuevosDatos, { new: true });
        } else {
            const nuevosDatos = {
                $push: {
                    comments: {
                        comment: comment,
                        rating: rating
                    }
                }
            };
            await Show.findByIdAndUpdate(objectId, nuevosDatos, { new: true });
        }

        res.status(200).json({ message: 'Comentario agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar el comentario:', error);
        res.status(500).json({ error: 'Error al agregar el comentario' });
    }
}
