import { Router } from "express";
const router = Router();
import { ToggleVideoLike, ToggleCommentLike, ToggleTweetLike, GetLikedVideos } from "../../controllers/likes.controller.js";


// ----------------- Auth's Routes -------------- START

router.patch("/video", ToggleVideoLike);
router.patch("/comment", ToggleCommentLike);
router.patch("/tweet", ToggleTweetLike);
router.get("/likedVideo", GetLikedVideos);

// ----------------- Auth's Routes -------------- END

export default router;