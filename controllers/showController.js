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
exports.getShowById = void 0;
const db_1 = require("../database/db");
const axios_1 = __importDefault(require("axios"));
function getShowById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const showId = req.query.show_id;
            // Conectar a la base de datos
            const db = yield (0, db_1.connectToDatabase)();
            // Verifico si el showId existe en la base de datos
            const existingShow = yield db.collection('shows').findOne({ id: parseInt(showId) });
            if (!existingShow) {
                // Si no existe en la base de datos, realizar la solicitud a la API externa
                const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
                const response = yield axios_1.default.get(apiUrl);
                const showData = response.data;
                res.json(showData);
                // Inserto el documento en la colección
                const result = yield db.collection('shows').insertOne(showData);
                console.log('Documento insertado:', result.insertedId);
            }
            else {
                // Retorno la coleccion existente en la base de datos
                res.json(existingShow);
            }
        }
        catch (error) {
            console.error('Error al obtener los datos del programa:', error);
            res.status(500).json({ error: 'Error al obtener los datos del programa' });
        }
    });
}
exports.getShowById = getShowById;
