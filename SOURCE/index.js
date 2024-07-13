import "dotenv/config";
import express from "express";
import cors from "cors"
import ApiRoutes from "../SOURCE/routes/version.js";
import connectDB from "../SOURCE/database/DBconnect.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import morgan from "morgan";

const DevHubApp = express();

const PORT = process.env.MONGO_PORT || 8000;

DevHubApp.use(express.json());
DevHubApp.use(express.urlencoded({ extended : true }));



app.use(session({
    secret: 'your_secret_key',
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/test',
      collectionName: 'sessions', // Optional: specify the collection name
      ttl: 24 * 60 * 60 // 1 day (time-to-live in seconds)
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));


// app.get('/', (req, res) => {
//     if (!req.session.views) {
//       req.session.views = 0;
//     }
//     req.session.views++;
//     res.send(`Number of views: ${req.session.views}`);
//   });


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to next middleware
    } else {
      res.status(401).json({ message: 'Unauthorized' }); // Not authenticated
    }
  }

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