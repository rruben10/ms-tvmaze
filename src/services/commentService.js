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
const db_1 = require("../database/db");
class CommentService {
    addCommentToShow(showId, newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield (0, db_1.connectToDatabase)();
                const collection = db.collection('shows');
                const result = yield collection.findOneAndUpdate({ id: showId }, {
                    $push: {
                        comments: newComment
                    },
                }, {
                    returnDocument: 'after',
                    upsert: false,
                });
                if (result === null || result === void 0 ? void 0 : result._id) {
                    console.log('Comentario agregado correctamente:', result._id);
                    return result._id;
                }
                else {
                    console.log('Show no encontrado');
                    return null;
                }
            }
            catch (error) {
                console.error('Error al agregar el comentario:', error);
                throw error;
            }
        });
    }
}
exports.default = CommentService;
