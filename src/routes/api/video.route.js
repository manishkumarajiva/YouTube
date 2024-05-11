import { Router } from "express";
const router = Router();
import { UpdateChannelVideo, GetChannelVideo, GetVideoById, UpdateChannelVideo } from "../../controllers/video.controller.js";
import { PublishChannelVideo, TogglePublicStatus, DeleteChannelVideo } from "../../controllers/video.controller.js";


// ----------------- Video's Routes -------------- START

router.post("/upload", UpdateChannelVideo);
router.get("/channelvideo", GetChannelVideo);
router.get("/getbyId", GetVideoById);
router.put("/update", UpdateChannelVideo);
router.patch("/publish", PublishChannelVideo);
router.patch("/public", TogglePublicStatus);
router.delete("/delete", DeleteChannelVideo);

// ----------------- Video's Routes -------------- END

export default router;