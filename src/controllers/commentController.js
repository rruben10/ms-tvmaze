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
const commentService_1 = __importDefault(require("../services/commentService"));
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
            if (comment === undefined || comment.trim() === '') {
                res.status(400).json({ error: 'El campo de comentario es obligatorio y no puede estar vacío.' });
                return;
            }
            const newComment = {
                comment: comment,
                rating: rating,
            };
            const commentService = new commentService_1.default();
            commentService.addCommentToShow(showId, newComment);
            res.status(200).json({ message: 'Comentario agregado correctamente' });
        }
        catch (error) {
            console.error('Error al agregar el comentario:', error);
            res.status(500).json({ error: 'Error al agregar el comentario' });
        }
    });
}
exports.postCommentShow = postCommentShow;
