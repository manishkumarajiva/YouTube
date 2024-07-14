import "dotenv/config";
import express from "express";
import cors from "cors"
import ApiRoutes from "../SOURCE/routes/version.js";
import connectDB from "../SOURCE/database/DBconnect.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";

const DevHubApp = express();

const PORT = process.env.MONGO_PORT || 8000;

DevHubApp.use(express.json());
DevHubApp.use(express.urlencoded({ extended : true }));


app.use(session({
    secret: 'your_secret_key',
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
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