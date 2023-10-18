import { Request, Response } from 'express';
import CommentService from '../services/commentService'
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

        const commentService = new CommentService();
        commentService.addCommentToShow(showId, newComment);

        res.status(200).json({ message: 'Comentario agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar el comentario:', error);
        res.status(500).json({ error: 'Error al agregar el comentario' });
    }
}