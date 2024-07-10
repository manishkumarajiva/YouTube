import { Router } from "express";
const router = Router();
import Platform from "./API/PLATFORM/index.route.js";
import Studio from "./API/STUDIO/index.route.js";

// --------------- YouTube App Version --------------- 

router.use("/V1/platform", Platform);
router.use("/V1/studio", Studio);

export default router;

