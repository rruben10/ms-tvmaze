import axios from 'axios';
import { connectToDatabase } from '../database/db';
import ISearchResult from '../interfaces/ISearchResult';

class SearchService {
  async searchShows(searchQuery: string): Promise<ISearchResult[]> {
    try {
      const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchQuery}`;
      const response = await axios.get(apiUrl);
      const responseData = response.data;

      const db = await connectToDatabase();
      const collection = db.collection('shows');

      const showsWithComments: ISearchResult[] = await Promise.all(
        responseData.map(async (item: any) => {
          // Obtener comentarios para el show actual
          const comments = await this.getCommentsForShow(collection, item.show.id);
          return {
            id: item.show.id,
            name: item.show.name,
            channel: item.show.network ? item.show.network.name : (item.show.webChannel ? item.show.webChannel.name : null),
            summary: item.show.summary,
            genres: item.show.genres,
            comments: comments,
          };
        })
      );

      return showsWithComments;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw new Error('Error al obtener los datos');
    }
  }

  private async getCommentsForShow(collection: any, showId: number): Promise<any[]> {
    // pipeline de agregación y devuelve los comentarios del show
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
                comments: {
                    // Agrega los comentarios al arreglo sin crear un nivel adicional de anidación
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

    // Ejecuta el pipeline y retorna los comentarios
    const arrayComments = await collection.aggregate(pipeline).toArray();
    // Devuelve solo el arreglo de comentarios sin el nivel adicional de anidación
    return arrayComments.length > 0 ? arrayComments[0].comments : [];
  }
}

export default SearchService;
