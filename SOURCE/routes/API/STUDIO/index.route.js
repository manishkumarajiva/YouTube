import { Router } from "express";
const router = Router();

import VideoRoutes from "./video.route.js";


// ------------------ INDEX ROUTES ---------------------- START

router.use("/video", VideoRoutes)

// ------------------ INDEX ROUTES ---------------------- END


export default router;