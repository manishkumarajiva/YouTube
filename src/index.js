import "dotenv/config";
import express from "express";
import cors from "cors"
import ApiRoutes from "./routes/index.js";
import connectDB from "./database/DBconnect.js";

const youtube = express();
const PORT = process.env.MONGO_PORT || 8000;

youtube.use(express.json());
youtube.use(express.urlencoded({ extended : true }));

youtube.use(cors("*"))

youtube.use("/api", ApiRoutes);

youtube.listen(PORT, console.log(`YouTube App Listening on PORT :: ${PORT}`));