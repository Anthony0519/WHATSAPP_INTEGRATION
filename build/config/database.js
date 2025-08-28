"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const databaseConnect = async () => {
    try {
        const dbUrl = process.env.DATABASE_URL_V1;
        const connect = await mongoose_1.default.connect(dbUrl);
        console.log(`Database connected to ${connect.Connection.name}`);
    }
    catch (error) {
        console.log("Error: " + error.message);
        process.exit(1);
    }
};
exports.default = databaseConnect;
