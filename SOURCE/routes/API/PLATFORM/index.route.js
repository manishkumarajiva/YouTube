import { Router } from "express";
const router = Router();

import UserRoutes from "./user.route.js";
import AuthRoutes from "./auth.route.js";
import LikeRoutes from "../like.route.js";
import VideoRoutes from "../video.route.js";
import TweetRoutes from "../tweet.route.js";
import CommentRoutes from "./comment.route.js";
import PlaylistRoutes from "../playlist.route.js";
import HealthcheckRoutes from "./healthcheck.route.js";
import SubscriptionRoutes from "../subscription.route.js";
import { VerifyToken } from  "../../../middlewares/authenticate.middleware.js";


// ----------------- Index Routes -------------- START

router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/youtube", HealthcheckRoutes);
router.use("/like", VerifyToken, LikeRoutes);
router.use("/video", VerifyToken, VideoRoutes);
router.use("/tweet", VerifyToken, TweetRoutes);
router.use("/comment", VerifyToken, CommentRoutes);
router.use("/playlist", VerifyToken, PlaylistRoutes);
router.use("/subscription", VerifyToken, SubscriptionRoutes);

// ----------------- Index Routes -------------- END

export default router;