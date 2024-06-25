import { use, serializeUser, deserializeUser } from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreate, findById } from '../models/user.model.js';



use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


serializeUser(function(user, done){
  done(null, user.id);
});


deserializeUser(function(id, done){
  findById({ _id : id }).then((user) => {
    done(null, user);
  })
});