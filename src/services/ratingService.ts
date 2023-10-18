// ratingService.js
// ratingService.js
import { connectToDatabase } from '../database/db';

class RatingService {
    async getAverageRating(showId: number): Promise<number> {
        try {
            const db = await connectToDatabase();
            const collection = db.collection('shows');

            const pipeline = [
                {
                    $match: {
                        id: showId
                    }
                },
                {
                    $unwind: '$comments'
                },
                {
                    $group: {
                        _id: null,
                        averageRating: {
                            $avg: '$comments.rating'
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        averageRating: 1
                    }
                }
            ];

            const result = await collection.aggregate(pipeline).toArray();

            if (result.length > 0) {
                // Calcula el promedio y redondea a 2 decimales
                const averageRating = parseFloat((result[0].averageRating || 0).toFixed(2));

                // Espera 4 segundos antes de devolver el resultado
                await new Promise(resolve => setTimeout(resolve, 4000));
                
                return averageRating;
            } else {
                throw new Error('Show no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener el rating del show:', error);
            throw new Error('Error al obtener el rating del show');
        }
    }
}

export default RatingService;