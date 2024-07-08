import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import CreateUser from "../helpers/google.helper.js";
import UserModel from "../models/user.model.js";
import { generateRefreshAndAccessToken } from "../middlewares/authenticate.middleware.js";



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CLIENT_SECRET
},
  async function (accessToken, refreshToken, profile, done) {

    try {
      const userExist = await UserModel.findOne({ googleId : profile.id });

      if(!userExist){

        const createPayload = {
          googleId : profile.id,
          fullname : "Manish Dhiman",
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

      const updateUser = await UserModel.findOneAndUpdate({ googleId : profile.id }, updatePayload, { new : true });
      return done(null, updateUser);

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