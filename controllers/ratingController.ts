import { Request, Response } from 'express';
import { connectToDatabase } from '../database/db';

export async function getRating(req: Request, res: Response): Promise<void> {
    try {
        const showId = parseInt(req.query.show_id as string);

        const db = await connectToDatabase();
        const collection = db.collection('shows');

        const pipeline = [
            {
                $match: {
                    id: showId
                }
            },
            {
                // Divide el arreglo comments en documentos individuales
                $unwind: '$comments' 
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        // Calcula el promedio del campo rating en comments
                        $avg: '$comments.rating' 
                    }
                }
            },
            {
                $project: {
                    // Excluye el campo _id del resultado
                    _id: 0, 
                    // Incluye solo el campo averageRating en el resultado
                    averageRating: 1 
                }
            }
        ];

        setTimeout(async () => {
            try {
                const result = await collection.aggregate(pipeline).toArray();

                if (result.length > 0) {
                    //Retorno promedio con 2 decimales
                    res.status(200).json(result[0].toFixed(2));
                } else {
                    res.status(404).json({ error: 'Show no encontrado' });
                }
            } catch (error) {
                console.error('Error al obtener el rating del show:', error);
                res.status(500).json({ error: 'Error al obtener el rating del show' });
            }
        }, 4000);
    }
    catch (error) {
        console.error('Error al obtener promedio de rating:', error);
        res.status(500).json({ error: 'Error al obtener promedio de rating' });
    }
}