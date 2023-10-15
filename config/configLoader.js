"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const env = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'local';
const config = require(`./config/${env}.ts`);
exports.default = config;
