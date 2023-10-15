"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./routes/Routes"));
const db_1 = require("./database/db");
//import config from './config/configLoader';
const app = (0, express_1.default)();
(0, db_1.connectToDatabase)();
app.use(Routes_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
