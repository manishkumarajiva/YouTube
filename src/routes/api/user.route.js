import { Router } from "express";
const router = Router();
import { RegisterUser, GetCurrentUser, UpdateUserAccountDetails } from "../../controllers/user.controller.js";
import { UpdateUserCoverImage, UpdateUserAvatar, GetWatchHistory } from "../../controllers/user.controller.js";
import { VerifyToken } from "../../middlewares/authenticate.middleware.js";
import { VerifyUser } from "../../middlewares/authorize.middleware.js";
import upload from "../../middlewares/upload.middleware.js";


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
router.get("/profile", VerifyToken, VerifyUser ,GetCurrentUser);
router.put("/updateprofile", UpdateUserAccountDetails);
router.put("/coverimage", upload.single("converImage"), UpdateUserCoverImage);
router.put("/avatar", upload.single("avatar"), UpdateUserAvatar);
router.get("/history", GetWatchHistory);

// ----------------- User's Routes -------------- END

export default router;