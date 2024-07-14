import { Router } from "express";
const router = Router();
import passport from "passport";
import googleStragety from "../../../config/passport.config.js";
import { LoginAuthentication, LogoutAuthentication } from "../../../controllers/auth.controller.js";
import { UpdateCurrentPassword, ForgetUserPassword, ResetUserPassword, RefreshAccessToken } from "../../../controllers/auth.controller.js";
import { AccessToken ,VerifyToken } from  "../../../middlewares/authenticate.middleware.js"


// ----------------- Auth's Routes -------------- START

router.post("/login", LoginAuthentication);
router.get("/logout", VerifyToken, LogoutAuthentication);
router.patch("/changepassword", VerifyToken, UpdateCurrentPassword);
router.patch("/forgetpassword", ForgetUserPassword);
router.patch("/resetpassword", ResetUserPassword);
router.get("/refreshtoken", VerifyToken, RefreshAccessToken);



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: 'https://www.linkedin.com/in/manish-leo/'
 }),async function async(req, res) {
    const token =  await AccessToken(req.user);
    res.status(200).json({ status : 200, message : "Success Login", accessToken : req.user.googleAccessToken, refreshToken : req.user.googleRefreshToken, token : token });
});

// ----------------- Auth's Routes -------------- END

export default router;



  // seccessRedirect : "https://github.com/manishkumarajiva?tab=overview&from=2024-06-01&to=2024-06-22"
