import { Router } from "express";
const router = Router();
import { UploadChannelVideo, GetChannelVideo, GetVideoById, UpdateVideoInfo, UploadVideoThumbnail } from "../../../controllers/video.controller.js";
import { PublishChannelVideo, TogglePublicStatus, DeleteChannelVideo, RemoveHistoryVideo } from "../../../controllers/video.controller.js";
import upload from "../../../middlewares/upload.middleware.js";
import { VerifyToken } from "../../../middlewares/authenticate.middleware.js";

// ----------------- Video's Routes -------------- START

router.post("/upload", upload.single("video"), VerifyToken, UploadChannelVideo);
router.put("/thumbnail", upload.single("thumbnail"), UploadVideoThumbnail);
router.get("/singlebyid", GetVideoById);
router.get("/channelvideo", GetChannelVideo);
router.put("/updateinfo", UpdateVideoInfo);

router.patch("/publish", PublishChannelVideo);
router.patch("/public", TogglePublicStatus);
router.delete("/delete", DeleteChannelVideo);
router.delete("/historyVideo", RemoveHistoryVideo);

// ----------------- Video's Routes -------------- END

export default router;