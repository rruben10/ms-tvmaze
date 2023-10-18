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
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../database/db");
class SearchService {
    searchShows(searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchQuery}`;
                const response = yield axios_1.default.get(apiUrl);
                const responseData = response.data;
                const db = yield (0, db_1.connectToDatabase)();
                const collection = db.collection('shows');
                const showsWithComments = yield Promise.all(responseData.map((item) => __awaiter(this, void 0, void 0, function* () {
                    // Obtener comentarios para el show actual
                    const comments = yield this.getCommentsForShow(collection, item.show.id);
                    return {
                        id: item.show.id,
                        name: item.show.name,
                        channel: item.show.network ? item.show.network.name : (item.show.webChannel ? item.show.webChannel.name : null),
                        summary: item.show.summary,
                        genres: item.show.genres,
                        comments: comments,
                    };
                })));
                return showsWithComments;
            }
            catch (error) {
                console.error('Error al obtener los datos:', error);
                throw new Error('Error al obtener los datos');
            }
        });
    }
    getCommentsForShow(collection, showId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const arrayComments = yield collection.aggregate(pipeline).toArray();
            // Devuelve solo el arreglo de comentarios sin el nivel adicional de anidación
            return arrayComments.length > 0 ? arrayComments[0].comments : [];
        });
    }
}
exports.default = SearchService;
