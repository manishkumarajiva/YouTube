import { Router } from "express";
const router = Router();
import Platform from "./API/PLATFORM/index.route.js";
import Studio from "./API/STUDIO/index.js";

// --------------- YouTube App Version --------------- 

router.use("/V1/platform/devhub", Platform);
router.use("/V1/studio/devhub", Studio);

export default router;

