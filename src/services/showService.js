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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const axios_1 = __importDefault(require("axios"));
class ShowService {
    mapDbDocumentToShowResult(document) {
        const dbResult = {
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
    getShowById(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield (0, db_1.connectToDatabase)();
                const existingShow = yield db.collection('shows').findOne({ id: parseInt(showId) });
                if (!existingShow) {
                    // Si el show no existe en la base de datos, se hace la solicitud a la API externa
                    const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
                    const response = yield axios_1.default.get(apiUrl);
                    const showData = response.data;
                    // Se inserta el documento en la coleccion
                    yield db.collection('shows').insertOne(showData);
                    console.log('Documento insertado:', showData);
                    return showData;
                }
                else {
                    // Si el show existe en la base de datos, se retorna el documento existente con la interfaz mapeada
                    return this.mapDbDocumentToShowResult(existingShow);
                }
            }
            catch (error) {
                console.error('Error al obtener los datos del programa:', error);
                throw new Error('Error al obtener los datos del programa');
            }
        });
    }
}
exports.default = ShowService;
