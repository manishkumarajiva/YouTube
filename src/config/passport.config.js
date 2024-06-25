const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/user.model.js');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


passport.serializeUser(function(user, done){
  done(null, user.id);
});


passport.deserializeUser(function(id, done){
  UserModel.findById({ _id : id }).then((user) => {
    done(null, user);
  })
});