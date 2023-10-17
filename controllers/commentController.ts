import { Request, Response } from 'express';
import { connectToDatabase } from '../database/db';
import { PushOperator } from 'mongodb';
import IComment from '../interfaces/IComment'

export async function postCommentShow(req: Request, res: Response): Promise<void> {
    try {
        const showId = parseInt(req.body.id as string);
        const comment = req.body.comment as string;
        const rating = parseInt(req.body.rating as string);

        if (isNaN(rating) || rating < 0 || rating > 5) {
            res.status(400).json({ error: 'El rating debe estar entre 0 y 5.' });
            return;
        }

        if (comment === undefined || comment.trim() === '') {
            res.status(400).json({ error: 'El campo de comentario es obligatorio y no puede estar vacío.' });
            return;
        }

        const newComment: IComment = {
            comment: comment,
            rating: rating,

        };

        async function addCommentToShow(showId: number, newComment: IComment) {
            try {
                const db = await connectToDatabase();
                const collection = db.collection('shows');

                const result = await collection.findOneAndUpdate(
                    { id: showId },
                    {
                        $push: {
                            comments: newComment
                        } as unknown as PushOperator<Document>,
                    },
                    {
                        returnDocument: 'after',
                        upsert: false,
                    }
                );
                
                if (result?._id) {
                    console.log('Comentario agregado correctamente:', result._id);
                    return result._id;
                } else {
                    console.log('Show no encontrado');
                    return null;
                }
            } catch (error) {
                console.error('Error al agregar el comentario:', error);
                throw error;
            }
        }

        addCommentToShow(showId, newComment);

        res.status(200).json({ message: 'Comentario agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar el comentario:', error);
        res.status(500).json({ error: 'Error al agregar el comentario' });
    }
}