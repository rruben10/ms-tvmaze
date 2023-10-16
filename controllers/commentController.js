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
exports.postCommentShow = void 0;
const db_1 = require("../database/db");
const { ObjectId } = require('mongodb');
const axios_1 = __importDefault(require("axios"));
const showModel_1 = __importDefault(require("../models/showModel"));
function postCommentShow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const showId = parseInt(req.body.id);
            const comment = req.body.comment;
            const rating = parseInt(req.body.rating);
            if (isNaN(rating) || rating < 0 || rating > 5) {
                res.status(400).json({ error: 'El rating debe estar entre 0 y 5.' });
                return;
            }
            const objectId = new ObjectId(showId);
            const db = yield (0, db_1.connectToDatabase)();
            const existingShow = yield db.collection('shows').findOne({ id: showId });
            if (!existingShow) {
                const apiUrl = `https://api.tvmaze.com/shows/${showId}`;
                const response = yield axios_1.default.get(apiUrl);
                const showData = response.data;
                const nuevosDatos = {
                    $push: {
                        comments: {
                            comment: comment,
                            rating: rating
                        }
                    }
                };
                // Inserto el documento en la colección
                yield db.collection('shows').insertOne(showData);
                yield showModel_1.default.findByIdAndUpdate(objectId, nuevosDatos, { new: true });
            }
            else {
                const nuevosDatos = {
                    $push: {
                        comments: {
                            comment: comment,
                            rating: rating
                        }
                    }
                };
                yield showModel_1.default.findByIdAndUpdate(objectId, nuevosDatos, { new: true });
            }
            res.status(200).json({ message: 'Comentario agregado correctamente' });
        }
        catch (error) {
            console.error('Error al agregar el comentario:', error);
            res.status(500).json({ error: 'Error al agregar el comentario' });
        }
    });
}
exports.postCommentShow = postCommentShow;
