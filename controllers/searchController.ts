import axios from 'axios';
import { Request, Response } from 'express';
import ISearchResult from '../interfaces/ISearchResult';
import { connectToDatabase } from '../database/db';

export async function getSearch(req: Request, res: Response): Promise<void> {
    try {
        const searchQuery = req.query.search_query as string;
        const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchQuery}`;
        const response = await axios.get(apiUrl);
        const responseData = response.data;

        const db = await connectToDatabase();
        const collection = db.collection('shows');

        // Mapear la respuesta para que coincida con tu interfaz ISearchResult
        const objetos: ISearchResult[] = await Promise.all(responseData.map(async (item: any) => {
            const pipeline = [
                {
                    $match: {
                        id: item.show.id
                    }
                },
                {
                    // Divide el arreglo comments en documentos individuales
                    $unwind: '$comments'
                },
                {
                    $group: {
                        _id: null,
                        comments: {
                            // Agrega los comentarios al arreglo
                            $push: {
                                comment: '$comments.comment',
                                rating: '$comments.rating'
                            }
                        }
                    }
                },
                {
                    $project: {
                        // Excluye el campo _id del resultado
                        _id: 0,
                        // Incluye solo el campo 'comments' en el resultado
                        comments: 1
                    }
                }
            ];

            const arrayComments = await collection.aggregate(pipeline).toArray();

            return {
                id: item.show.id,
                name: item.show.name,
                channel: item.show.network ? item.show.network.name : (item.show.webChannel ? item.show.webChannel.name : null),
                summary: item.show.summary,
                genres: item.show.genres,
                // Si hay comentarios, asigna el arreglo de comentarios; de lo contrario, asigna un arreglo vacío
                comments: arrayComments[0] ? arrayComments[0].comments : [] 
            };
        }));

        res.json(objetos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}