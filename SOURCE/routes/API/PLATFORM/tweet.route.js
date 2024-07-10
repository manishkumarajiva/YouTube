import { Router } from "express";
const router = Router();
import { CreateUserTweet, GetUserTweets, UpdateUserTweet, DeleteUserTweet } from "../../../controllers/tweet.controller.js";


// ----------------- Tweet's Routes -------------- START

router.post("/create", CreateUserTweet);
router.get("/fetch", GetUserTweets);
router.put("/update", UpdateUserTweet);
router.delete("/delete", DeleteUserTweet);

// ----------------- Tweet's Routes -------------- END

export default router;