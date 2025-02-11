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
/* eslint-disable @typescript-eslint/no-explicit-any */
const csv_reader_1 = __importDefault(require("csv-reader"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const models_1 = require("models");
dotenv.config({ path: `${process.cwd()}/.env` });
const envVariables_1 = require("config/envVariables");
const mongoose_1 = __importDefault(require("mongoose"));
const processSPConstituents = () => __awaiter(void 0, void 0, void 0, function* () {
    // read csv file
    yield mongoose_1.default.connect((0, envVariables_1.makeMongoURI)('transcripts'));
    const filePath = `${process.cwd()}/data/sp_constituents.csv`;
    const inputStream = fs.createReadStream(filePath, 'utf8');
    inputStream
        .pipe((0, csv_reader_1.default)({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true }))
        .on('data', (row) => __awaiter(void 0, void 0, void 0, function* () {
        // row is an array of CSV column data mapped to object properties
        const { ticker, companyName, sector, subIndustry, hqLocation, dateAdded, cik, founded } = row;
        const newCompanyDoc = yield models_1.Company.create({
            companyTicker: ticker,
            companyName,
            gics: {
                sector,
                subIndustry,
            },
        });
    }));
});
processSPConstituents();
//# sourceMappingURL=seedSPConstituents.js.map