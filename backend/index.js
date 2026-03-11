// backend/index.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import aiRouter from "./routes/aiRoutes.js"; // AI route
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration
app.use(cors({
    origin: [
        "http://localhost:5173",                             // local dev
        "https://ai-virtual-assistant-d5m4.onrender.com",    // old frontend
        "https://ai-cq1v.onrender.com"                       // new frontend
    ],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);  // AI chat route

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    connectDb();
    console.log(`Server started on port ${port}`);
});
