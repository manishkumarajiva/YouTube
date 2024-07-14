

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





async function verifyGoogleAccessToken(accessToken) {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
    return response.data && response.data.aud === process.env.GOOGLE_CLIENT_ID;
  }
  
  async function protectRoute(req, res, next) {
    if (req.isAuthenticated()) {
      const isValidToken = await verifyGoogleAccessToken(req.user.accessToken);
      if (isValidToken) {
        return next();
      } else {
        return res.status(401).json({ message: 'Invalid access token' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }



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




// Middleware to verify accessToken
async function verifyAccessToken(accessToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload && payload.aud === process.env.GOOGLE_CLIENT_ID;
  } catch (error) {
    return false;
  }
}

// Middleware to protect routes
async function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    const isValidToken = await verifyAccessToken(req.user.accessToken);
    if (isValidToken) {
      return next();
    } else {
      return res.status(401).json({ message: 'Invalid access token' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// Protected route example
app.get('/api/protected', protectRoute, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});



// Using Passport.js with Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  // Store accessToken and refreshToken securely
  const user = {
    profile: profile,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return done(null, user);
}));




// Middleware to issue JWT
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, issue JWT
    const user = req.user; // User object containing accessToken and refreshToken
    const jwtToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', jwtToken, { httpOnly: true, secure: true });
    res.redirect('/profile');
  });

// Example protected route using JWT for authorization
app.get('/profile', (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      res.json({ message: 'Authenticated', user: decoded });
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


// req.logout(err => {
//   if (err) { return next(err); }
//   res.redirect('/');