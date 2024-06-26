import { Router } from "express";
const router = Router();
import { RegisterUser, GetCurrentUser, UpdateUserAccountDetails } from "../../controllers/user.controller.js";
import { UpdateUserCoverImage, UpdateUserAvatar, GetWatchHistory } from "../../controllers/user.controller.js";
import { VerifyToken } from "../../middlewares/authenticate.middleware.js";
import upload from "../../middlewares/upload.middleware.js";
import passport from "passport";
import passportStratgy from "../../config/passport.config.js";

// ----------------- User's Routes -------------- START

router.post("/register", upload.fields([
    {
        name : "avatar",
        maxCount : 1
    },
    {
        name : "banner",
        maxCount : 1
    }
]), RegisterUser);
router.get("/profile", VerifyToken, GetCurrentUser);
router.patch("/updateprofile", VerifyToken, UpdateUserAccountDetails);
router.put("/avatar", VerifyToken, upload.single("avatar"), UpdateUserAvatar);
router.put("/banner", VerifyToken, upload.single("banner"), UpdateUserCoverImage);
router.get("/history", VerifyToken, GetWatchHistory);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
  
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'https://www.linkedin.com/in/manish-leo/' }),
    function(req, res) {
      res.redirect("https://github.com/manishkumarajiva?tab=overview&from=2024-06-01&to=2024-06-22");
});


// ----------------- User's Routes -------------- END

export default router;