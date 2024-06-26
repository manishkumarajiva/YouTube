import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from "../models/user.model";
import ErrorHandler from "../utils/errorHandler";


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/api/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("inside google strategy", profile);

    UserModel.findOne({ googleId: profile.id }, function (err, user) {
      if(err) res.status(200).json(new ErrorHandler(401, "GoogleStrategy Error"));
      if(user){
        done(null, user);
      }else{
        new UserModel({
          googleId : profile.id,
          fullname : "Manish LEO"
        }).save({ validationBeforeSave : false }).then((createUser) => {
          console.log("NEW USER :: ", createUser)
          done(null, createUser);
        })
      }

    });
  }
));


passport.serializeUser(function(user, done){
  console.log("SearializeUser :: ", user);
  done(null, user.id);
});


passport.deserializeUser(function(id, done){
  UserModel.findById({ _id : id }).then((user) => {
    done(null, user);
  })
});