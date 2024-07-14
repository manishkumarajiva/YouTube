import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from "../models/user.model.js";



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REDIRECT_CALLBACK_URI,
  access_type: 'offline', // Ensures a refresh token is returned
  prompt: 'consent' // Ensures the user is prompted to consent every time
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const userExist = await UserModel.findOne({ googleId : profile.id });

      if(!userExist){
        const createPayload = {
          googleId : profile.id,
          fullname : profile.displayName,
          email : profile.emails[0].value,
          googleAccessToken : accessToken,
          googleRefreshToken : refreshToken
        }

        const newUser = await UserModel.create(createPayload);
        return done(null, newUser);
      }

      const updatePayload = {
        googleAccessToken : accessToken,
        googleRefreshToken : refreshToken
      }

      const user = await UserModel.findOneAndUpdate({ googleId : profile.id }, updatePayload, { new : true });
      return done(null, user);

    } catch (error) {
      console.error("Passport JS :: ", error.message, "Stack :: ", error.stack);
      done(error, false);
    }
  }
))


passport.serializeUser(function (user, done) {
  done(null, user.id);
})


passport.deserializeUser(function (id, done) {
  UserModel.findById({ _id: id }).then((user) => {
    done(null, user);
  })
})


export default passport;