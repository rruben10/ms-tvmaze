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
const showService_1 = __importDefault(require("../services/showService"));
function getShowById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const showId = req.query.show_id;
            const showService = new showService_1.default();
            const showData = yield showService.getShowById(showId);
            res.json(showData);
        }
        catch (error) {
            console.error('Error al obtener los datos del programa:', error);
            res.status(500).json({ error: 'Error al obtener los datos del programa' });
        }
    });
}
exports.getShowById = getShowById;
