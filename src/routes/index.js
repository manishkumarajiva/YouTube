import { Router } from "express";
const router = Router();
import YouTubeRoutes from "./api/index.route.js";


// --------------- YouTube App Version --------------- 
router.use("/V.YT.0.0.1", YouTubeRoutes);


export default router;

