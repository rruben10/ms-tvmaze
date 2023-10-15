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
function getSearch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchQuery = req.query.search_query;
            const apiUrl = `http://api.tvmaze.com/search/shows?q=${searchQuery}`;
            const response = yield axios_1.default.get(apiUrl);
            const objetos = response.data;
            res.json(objetos);
        }
        catch (error) {
            console.error('Error al obtener los datos:', error);
            res.status(500).json({ error: 'Error al obtener los datos' });
        }
    });
}
exports.getSearch = getSearch;
