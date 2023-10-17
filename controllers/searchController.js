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
exports.getSearch = void 0;
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../database/db");
function getSearch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchQuery = req.query.search_query;
            const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchQuery}`;
            const response = yield axios_1.default.get(apiUrl);
            const responseData = response.data;
            const db = yield (0, db_1.connectToDatabase)();
            const collection = db.collection('shows');
            // Mapear la respuesta para que coincida con tu interfaz ISearchResult
            const objetos = yield Promise.all(responseData.map((item) => __awaiter(this, void 0, void 0, function* () {
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
                const arrayComments = yield collection.aggregate(pipeline).toArray();
                return {
                    id: item.show.id,
                    name: item.show.name,
                    channel: item.show.network ? item.show.network.name : (item.show.webChannel ? item.show.webChannel.name : null),
                    summary: item.show.summary,
                    genres: item.show.genres,
                    // Si hay comentarios, asigna el arreglo de comentarios; de lo contrario, asigna un arreglo vacío
                    comments: arrayComments[0] ? arrayComments[0].comments : []
                };
            })));
            res.json(objetos);
        }
        catch (error) {
            console.error('Error al obtener los datos:', error);
            res.status(500).json({ error: 'Error al obtener los datos' });
        }
    });
}
exports.getSearch = getSearch;
