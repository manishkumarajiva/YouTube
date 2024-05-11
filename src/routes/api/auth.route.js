import { Router } from "express";
const router = Router();
import { LoginAuthentication, LogoutAuthentication } from "../../controllers/auth.controller.js";
import { UpdateCurrentPassword, ResetUserPassword, RefreshAccessToken } from "../../controllers/auth.controller.js";


// ----------------- Auth's Routes -------------- START

router.post("/login", LoginAuthentication);
router.get("/logout", LogoutAuthentication);
router.put("/resetpassword", ResetUserPassword);
router.get("/refreshtoken", RefreshAccessToken);
router.patch("/changepassword", UpdateCurrentPassword);

// ----------------- Auth's Routes -------------- END

export default router;