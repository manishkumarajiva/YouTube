import { Router } from "express";
const router = Router();
import { RegisterUser, GetCurrentUser, UpdateUserAccountDetails } from "../../../controllers/user.controller.js";
import { UpdateUserCoverImage, UpdateUserAvatar, GetWatchHistory } from "../../../controllers/user.controller.js";
import { VerifyToken } from "../../../middlewares/authenticate.middleware.js";
import upload from "../../../middlewares/upload.middleware.js";

// ----------------- User's Routes -------------- START

router.post("/register", RegisterUser);
router.get("/profile", VerifyToken, GetCurrentUser);
router.patch("/updateprofile", VerifyToken, UpdateUserAccountDetails);
router.put("/avatar", VerifyToken, upload.single("avatar"), UpdateUserAvatar);
router.put("/banner", VerifyToken, upload.single("banner"), UpdateUserCoverImage);
router.get("/history", VerifyToken, GetWatchHistory);


// ----------------- User's Routes -------------- END

export default router;