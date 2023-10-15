"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
let cachedDb = null;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedDb) {
            console.log('Utilizando la conexión de la caché');
            return cachedDb;
        }
        const username = 'rruben10';
        const password = 'wwOcDA2RBM59HsBq';
        const clusterUrl = 'cluster0.svnqk3s.mongodb.net';
        const dbName = 'tvmaze';
        const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            console.log('Conexión a MongoDB establecida');
            cachedDb = client.db(); // Almacena la conexión en la caché
            return cachedDb;
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    });
}
exports.connectToDatabase = connectToDatabase;
