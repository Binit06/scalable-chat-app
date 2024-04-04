import http from "http";
import path from "path";
import express from "express";
import SocketService from "./services/socket";

async function init() {
    const app = express(); // Initialize Express app
    const socketService = new SocketService();
    const httpServer = http.createServer(app); // Create HTTP server using Express app
    const PORT = process.env.PORT || 8000;

    // Serve static files in production mode
    const processmain = "production";
    const __dirname1 = path.resolve();
    const __dirname2 = path.join(__dirname1, "../");
    console.log(__dirname1)
    if (processmain === "production") {
        app.use(express.static(path.join(__dirname1, "/frontend/out")));

        // Serve index.html for any route in production mode
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname1, "frontend", "out", "index.html"));
        });
    } else {
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
}

init();
