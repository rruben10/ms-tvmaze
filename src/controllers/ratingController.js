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
exports.getRating = void 0;
const ratingService_1 = __importDefault(require("../services/ratingService"));
function getRating(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const showId = parseInt(req.query.show_id);
            const ratingService = new ratingService_1.default();
            const averageRating = yield ratingService.getAverageRating(showId);
            res.status(200).json(averageRating);
        }
        catch (error) {
            console.error('Error al obtener promedio de rating:', error);
            res.status(500).json({ error: 'Error al obtener promedio de rating' });
        }
    });
}
exports.getRating = getRating;
