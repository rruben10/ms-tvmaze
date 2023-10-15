"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ShowResultSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    language: { type: String, required: true },
    genres: { type: [String], required: true },
    status: { type: String, required: true },
    runtime: { type: Number, required: true },
    averageRuntime: { type: Number, required: true },
    premiered: { type: String, required: true },
    ended: { type: String, required: true },
    officialSite: { type: String, required: true },
    schedule: {
        time: { type: String, required: true },
        days: { type: [String], required: true },
    },
    rating: {
        average: { type: Number, required: true },
    },
    weight: { type: Number, required: true },
    network: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        country: {
            name: { type: String, required: true },
            code: { type: String, required: true },
            timezone: { type: String, required: true },
        },
        officialSite: { type: String, required: true },
    },
    webChannel: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        country: {
            name: { type: String, required: true },
            code: { type: String, required: true },
            timezone: { type: String, required: true },
        },
        officialSite: { type: String, required: true },
    },
    dvdCountry: { type: String },
    externals: {
        tvrage: { type: Number, required: true },
        thetvdb: { type: Number, required: true },
        imdb: { type: String, required: true },
    },
    image: {
        medium: { type: String, required: true },
        original: { type: String, required: true },
    },
    summary: { type: String, required: true },
    updated: { type: Number, required: true },
    _links: {
        self: {
            href: { type: String, required: true },
        },
        previousepisode: {
            href: { type: String, required: true },
        },
    },
});
const ShowResultModel = mongoose_1.default.model('ShowResult', ShowResultSchema);
exports.default = ShowResultModel;
