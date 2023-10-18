import { connectToDatabase } from '../database/db';
import { WithId, Document } from 'mongodb';
import axios from 'axios';
import IShowResult from '../interfaces/IShowResult';

class ShowService {
    private mapDbDocumentToShowResult(document: WithId<Document>): IShowResult {
        const dbResult: IShowResult = {
          id: document.id.toString(),
          url: document.url,
          name: document.name,
          type: document.type,
          language: document.language,
          genres: document.genres,
          status: document.status,
          runtime: document.runtime,
          averageRuntime: document.averageRuntime,
          premiered: document.premiered,
          ended: document.ended,
          officialSite: document.officialSite,
          schedule: document.schedule,
          rating: document.rating,
          weight: document.weight,
          network: document.network,
          webChannel: document.webChannel,
          dvdCountry: document.dvdCountry,
          externals: document.externals,
          image: document.image,
          summary: document.summary,
          updated: document.updated,
          _links: document._links,
          comments: document.comments,
        };

        return dbResult;
      }

  async getShowById(showId: string): Promise<IShowResult> {
    try {
      const db = await connectToDatabase();
      const existingShow = await db.collection('shows').findOne({ id: parseInt(showId) });

      if (!existingShow) {
        // Si el show no existe en la base de datos, se hace la solicitud a la API externa
        const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
        const response = await axios.get<IShowResult>(apiUrl);
        const showData: IShowResult = response.data;

        // Se inserta el documento en la coleccion
        await db.collection('shows').insertOne(showData);
        console.log('Documento insertado:', showData);
        
        return showData;
      } else {
        // Si el show existe en la base de datos, se retorna el documento existente con la interfaz mapeada
        return this.mapDbDocumentToShowResult(existingShow);
      }
    } catch (error) {
      console.error('Error al obtener los datos del programa:', error);
      throw new Error('Error al obtener los datos del programa');
    }
  }
}

export default ShowService;