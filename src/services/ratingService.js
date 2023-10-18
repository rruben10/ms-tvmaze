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
// ratingService.js
// ratingService.js
const db_1 = require("../database/db");
class RatingService {
    getAverageRating(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield (0, db_1.connectToDatabase)();
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
                const result = yield collection.aggregate(pipeline).toArray();
                if (result.length > 0) {
                    // Calcula el promedio y redondea a 2 decimales
                    const averageRating = parseFloat((result[0].averageRating || 0).toFixed(2));
                    // Espera 4 segundos antes de devolver el resultado
                    yield new Promise(resolve => setTimeout(resolve, 4000));
                    return averageRating;
                }
                else {
                    throw new Error('Show no encontrado');
                }
            }
            catch (error) {
                console.error('Error al obtener el rating del show:', error);
                throw new Error('Error al obtener el rating del show');
            }
        });
    }
}
exports.default = RatingService;
