

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

// LOAD Version

// export NVM_DIR="$HOME/.nvm"
//  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"



// DevHubApp.use(cookieParser(process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY, { httpOnly : true, secure : false }));



// DevHubApp.use(cookieSession({  
//     secret: //process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY,
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false, // don't create session until something stored,
//     secure : false,
// })); 



// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false, // Don't save session if unmodified
//     saveUninitialized: false, // Don't create session until something is stored
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Store sessions in MongoDB
//     cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1-day cookie expiration
//   }));



// app.use(session({
//     secret: 'your_secret_key',
//     resave: false, // Do not save session if unmodified
//     saveUninitialized: false, // Do not create session until something is stored
//     store: MongoStore.create({
//       mongoUrl: 'mongodb://localhost:27017/test',
//       collectionName: 'sessions', // Optional: specify the collection name
//       ttl: 24 * 60 * 60 // 1 day (time-to-live in seconds)
//     }),
//     cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
//   }));