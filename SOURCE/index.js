import "dotenv/config";
import express from "express";
import cors from "cors"
import ApiRoutes from "./routes/index.js";
import connectDB from "./database/DBconnect.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";

const DevHubApp = express();
const PORT = process.env.MONGO_PORT || 8000;

DevHubApp.use(express.json());
DevHubApp.use(express.urlencoded({ extended : true }));

DevHubApp.use(cookieParser(process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY, { httpOnly : true, secure : true }));

DevHubApp.use(cookieSession({  
    secret: process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
}));


DevHubApp.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY]
}));

DevHubApp.use(passport.initialize());
DevHubApp.use(passport.session());

DevHubApp.use(cors("*"));
DevHubApp.use(morgan("dev"));

DevHubApp.use("/api", ApiRoutes);

DevHubApp.listen(PORT, console.log(`YouTube App Listening on PORT :: ${PORT}`));