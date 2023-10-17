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
exports.getRating = void 0;
const db_1 = require("../database/db");
function getRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const showId = parseInt(req.query.show_id);
            const db = yield (0, db_1.connectToDatabase)();
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
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield collection.aggregate(pipeline).toArray();
                    if (result.length > 0) {
                        //Retorno promedio con 2 decimales
                        res.status(200).json(result[0].toFixed(2));
                    }
                    else {
                        res.status(404).json({ error: 'Show no encontrado' });
                    }
                }
                catch (error) {
                    console.error('Error al obtener el rating del show:', error);
                    res.status(500).json({ error: 'Error al obtener el rating del show' });
                }
            }), 4000);
        }
        catch (error) {
            console.error('Error al obtener promedio de rating:', error);
            res.status(500).json({ error: 'Error al obtener promedio de rating' });
        }
    });
}
exports.getRating = getRating;
