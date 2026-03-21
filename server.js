import express from "express";
import cors from "cors";
const app = express();
import config from "dotenv";
import { connectDB , disconnectDB} from "./src/config/db.js";
config.config();
connectDB();


app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


process.on("SIGINT", () => {
    disconnectDB();
    process.exit(0);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception", error);
    disconnectDB();
    process.exit(1);
});

process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection", error);
    disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", () => {
    disconnectDB();
    process.exit(0);
});


