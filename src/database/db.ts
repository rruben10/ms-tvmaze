require('dotenv').config();
import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        console.log('Utilizando la conexión de la caché');
        return cachedDb;
    }

    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const clusterUrl = process.env.MONGODB_CLUSTER_URL;
    const dbName = process.env.MONGODB_DB_NAME;

    const uri =
        `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conexión a MongoDB establecida');
        cachedDb = client.db(); // Almacena la conexión en la caché
        return cachedDb;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
}