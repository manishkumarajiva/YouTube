

// curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

// LOAD Version

// export NVM_DIR="$HOME/.nvm"
//  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"



// DevHubApp.use(cookieParser(process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY, { httpOnly : true, secure : false }));



// const MongoStore = require('connect-mongo')(session);


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



// Middleware to verify accessToken
function verifyAccessToken(req, res, next) {
    const accessToken = req.user.accessToken; // Assuming accessToken is stored in req.user

    // Example: Verify the accessToken with OAuth provider's API (Google API)
    // You may need to make a request to Google API's tokeninfo endpoint or use a library like `google-auth-library`

    // Example pseudo-code for verifying accessToken (Google OAuth specific)
    googleAuthLibrary.verifyAccessToken(accessToken, (err, tokenInfo) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Access token is valid, proceed to next middleware or route handler
        next();
    });
}

// Example protected route using verifyAccessToken middleware
app.get('/api/data', verifyAccessToken, (req, res) => {
    res.json({ message: 'Authenticated', user: req.user });
});




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




// req.session: Provides access to the session object, allowing you to store session data across requests.
// req.params: Contains route parameters (e.g., /users/:id).
// req.query: Contains query string parameters.
// req.body: Contains parsed request body, typically from form submissions or JSON payloads.
// req.cookies: Contains parsed cookies sent by the client.
// req.headers: Contains HTTP headers sent by the client.
// req.path: Contains the path part of the URL.
// req.method: Contains the HTTP method (GET, POST, PUT, etc.) of the request.
// req.url: Contains the full URL requested by the client.





// req.isUnauthenticated()
// Checks if the current user is authenticated. Returns true if the user is authenticated; otherwise, returns false

// req.isAuthenticated()
// Opposite of req.isAuthenticated(). Returns true if the user is not authenticated; otherwise, returns false.


// req.user 
// contains the authenticated user object. This is set by Passport.js during the authentication process.