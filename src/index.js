import "dotenv/config";
import express from "express";
import cors from "cors"
import ApiRoutes from "./routes/index.js";
import connectDB from "./database/DBconnect.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

const youtube = express();
const PORT = process.env.MONGO_PORT || 8000;

youtube.use(express.json());
youtube.use(express.urlencoded({ extended : true }));

youtube.use(cookieParser(process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY, { httpOnly : true, secure : true }));

youtube.use(cookieSession({  
    secret: process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY]
}));

youtube.use(passport.initialize());
youtube.use(passport.session());

youtube.use(cors("*"));

youtube.use("/api", ApiRoutes);

youtube.listen(PORT, console.log(`YouTube App Listening on PORT :: ${PORT}`));