import { Router } from "express";
const router = Router();
import { HealthCheckYouTube, YouTubeAppInfo } from "../../controllers/healthcheck.controller.js";

// ----------------- Healthcheck's Routes -------------- START

router.get("/healthcheck", HealthCheckYouTube);
router.get("/aboutapp", YouTubeAppInfo);

// ----------------- Healthcheck's Routes -------------- End


export default router;