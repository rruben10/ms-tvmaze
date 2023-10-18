import { connectToDatabase } from '../database/db';
import { PushOperator } from 'mongodb';
import IComment from '../interfaces/IComment'

class CommentService {
    async addCommentToShow(showId: number, newComment: IComment) {
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
}

export default CommentService;