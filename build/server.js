"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
const port = process.env.PORT;
const startServer = async () => {
    await (0, database_1.default)();
    // schedularKora.start();
    app.listen(port, () => {
        console.log(`Server started listening on ${port}`);
    });
};
const gracefulShutdown = async () => {
    console.log('Shutting down gracefully...');
    try {
        // schedularKora.stop();
        console.log('Server closed gracefully');
        process.exit(0);
    }
    catch (error) {
        logger.error('Error during shutdown:', error);
        process.exit(1);
    }
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
startServer();
