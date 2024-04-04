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
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const socket_1 = __importDefault(require("./services/socket"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)(); // Initialize Express app
        const socketService = new socket_1.default();
        const httpServer = http_1.default.createServer(app); // Create HTTP server using Express app
        const PORT = process.env.PORT || 8000;
        // Serve static files in production mode
        const processmain = "production";
        const __dirname1 = path_1.default.resolve();
        const __dirname2 = path_1.default.join(__dirname1, "../");
        console.log(__dirname1);
        if (processmain === "production") {
            app.use(express_1.default.static(path_1.default.join(__dirname1, "/frontend/out")));
            // Serve index.html for any route in production mode
            app.get("*", (req, res) => {
                res.sendFile(path_1.default.resolve(__dirname1, "frontend", "out", "index.html"));
            });
        }
        else {
            // Handle root route in development mode
            app.get("/", (req, res) => {
                res.send("API is running..");
            });
        }
        // Attach Socket.io to the HTTP server
        socketService.io.attach(httpServer);
        // Start listening on the specified port
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        // Initialize socket event listeners
        socketService.initListener();
    });
}
init();
