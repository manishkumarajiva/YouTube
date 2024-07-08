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

        const payload = {
          googleId : profile.id,
          fullname : "Manish Dhiman"
        }

        const newUser = await UserModel.create(payload);
        await generateRefreshAndAccessToken(newUser);
        return done(null, newUser);
      }

      await generateRefreshAndAccessToken(userExist);
      return done(null, userExist);
    } catch (error) {
      console.error("Passport JS :: ", error.message, "Stack :: ", error.stack);
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