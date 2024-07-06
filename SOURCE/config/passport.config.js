import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from "../models/user.model.js";
import { AccessToken } from "../middlewares/authenticate.middleware.js"


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/api/V.YT.1.0.0/user/google/callback"
},
function (accessToken, refreshToken, profile, done) {

    UserModel.findOne({ googleId: profile.id }).then((currUser) => {
      if (currUser) {
        done(null, currUser);
      } else {
        new UserModel({
          googleId: profile.id, 
          fullname: "Manish Dhiman"
        }).save().then(async (profile) => {
          const accessToken = await AccessToken({});
          res.cookie("accessToken", accessToken);
          done(null, profile);
        })
      }
    })
  }
));


passport.serializeUser(function (user, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  UserModel.findById({ _id: id }).then((user) => {
    done(null, user);
})
});


export default passport;