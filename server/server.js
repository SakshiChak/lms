import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import {clerkWebhooks} from "./controllers/webhooks.js";

// Initialize Express
const app = express();

const corsconfig = {
    origin: '*',
    credential: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}

// Async function to start the server
const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Middlewares
        app.use(cors(corsconfig));
        app.use(express.json());

        // Routes
        app.get('/', (req, res) => res.send('API Working'));
        app.post('/clerk', express.json(), clerkWebhooks);

        // Port 
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();

