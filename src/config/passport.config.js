import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from "../models/user.model.js";


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/api/V.YT.1.0.0/user/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log("inside google strategy", profile);
    UserModel.findOne({ googleId: profile.id }).then((currUser) => {
      if (currUser) {
        console.log("EXISTING USER :::")
        done(null, currUser);
      } else {
        console.log("NEW USER :::");
        new UserModel({
          googleId: profile.id, 
          fullname: "Manish Dhiman"
        }).save().then((profile) => {
          done(null, profile);
        })
      }
    })
  }
));


passport.serializeUser(function (user, done) {
    console.log("SearializeUser :: ", user);
    done(null, user.id);
  });


passport.deserializeUser(function (id, done) {
  UserModel.findById({ _id: id }).then((user) => {
    done(null, user);
  })
});


export default passport;