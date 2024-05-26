import { Router } from "express";
const router = Router();
import { RegisterUser, GetCurrentUser, UpdateUserAccountDetails } from "../../controllers/user.controller.js";
import { UpdateUserCoverImage, UpdateUserAvatar, GetWatchHistory } from "../../controllers/user.controller.js";
import { YouTubeProfile } from "../../middlewares/upload.middleware.js";


// ----------------- User's Routes -------------- START

router.post("/register", YouTubeProfile, RegisterUser);
router.get("/profile", GetCurrentUser);
router.put("/updateprofile", UpdateUserAccountDetails);
router.put("/coverimage", YouTubeProfile, UpdateUserCoverImage);
router.put("/avatar", YouTubeProfile, UpdateUserAvatar);
router.get("/history", GetWatchHistory);

// ----------------- User's Routes -------------- END

export default router;