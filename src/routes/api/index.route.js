import { Router } from "express";
const router = Router();

import AuthRoutes from "./auth.route.js";
import UserRoutes from "./user.route.js";
import LikeRoutes from "./like.route.js";
import VideoRoutes from "./video.route.js";
import TweetRoutes from "./tweet.route.js";
import CommentRoutes from "./comment.route.js";
import PlaylistRoutes from "./playlist.route.js";
import SubscriptionRoutes from "./subscription.route.js";


// ----------------- Index Routes -------------- START

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/like", LikeRoutes);
router.use("/video", VideoRoutes);
router.use("/tweet", TweetRoutes);
router.use("/comment", CommentRoutes);
router.use("/playlist", PlaylistRoutes);
router.use("/subscription", SubscriptionRoutes);

// ----------------- Index Routes -------------- END

export default router;