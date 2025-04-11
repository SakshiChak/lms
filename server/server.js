import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./configs/mongodb.js";
import {clerkWebhooks, stripeWebhooks} from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";

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

        await connectCloudinary();

        // Middlewares
        app.use(cors(corsconfig));
        app.use(clerkMiddleware());

        // Routes
        app.get('/', (req, res) => res.send('API Working'));
        app.post('/clerk', express.json(), clerkWebhooks);
        app.use('/api/educator', express.json(), educatorRouter);
        app.use('/api/course', express.json(), courseRouter);
        app.use('/api/user', express.json(), userRouter);
        app.post('/stripe',express.raw({ type: 'application/json' }),stripeWebhooks)

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

