import { Router } from "express";
const router = Router();
import { UploadChannelVideo, GetChannelVideo, GetVideoById, UpdateChannelVideo } from "../../controllers/video.controller.js";
import { PublishChannelVideo, TogglePublicStatus, DeleteChannelVideo, RemoveHistoryVideo } from "../../controllers/video.controller.js";
import upload from "../../middlewares/upload.middleware.js";

// ----------------- Video's Routes -------------- START

router.post("/upload", upload.fields([
    {
        name : "video",
        maxCount : 1
    },
    {
        name : "thumbnail",
        maxCount : 1
    }
]), UploadChannelVideo);
router.get("/singlebyid", GetVideoById);
router.get("/channelvideo", GetChannelVideo);
router.put("/update", upload.single("thumbnail"), UpdateChannelVideo);
router.patch("/publish", PublishChannelVideo);
router.patch("/public", TogglePublicStatus);
router.delete("/delete", DeleteChannelVideo);
router.delete("/historyVideo", RemoveHistoryVideo);

// ----------------- Video's Routes -------------- END

export default router;