import { Router } from "express";
const router = Router();
import { LoginAuthentication, LogoutAuthentication } from "../../controllers/auth.controller.js";
import { UpdateCurrentPassword, ResetUserPassword, RefreshAccessToken } from "../../controllers/auth.controller.js";
import { VerifyToken } from  "../../middlewares/authenticate.middleware.js"


// ----------------- Auth's Routes -------------- START

router.post("/login", LoginAuthentication);
router.get("/logout", VerifyToken, LogoutAuthentication);
router.put("/resetpassword", VerifyToken, ResetUserPassword);
router.get("/refreshtoken", VerifyToken, RefreshAccessToken);
router.patch("/changepassword", VerifyToken, UpdateCurrentPassword);

// ----------------- Auth's Routes -------------- END

export default router;