import { Router } from "express";
const router = Router();
import YouTubeRoutes from "./api/index.route.js";


// --------------- YouTube App Version --------------- 
router.use("/V.1.0.0", YouTubeRoutes);


export default router;

