import { Router } from "express";
const router = Router();
import { AddVideoComment, GetVideoComments, UpdateVideoComment, DeleteVideoComment } from "../../controllers/comment.controller.js";


// ----------------- Comment's Routes -------------- START

router.post("/create", AddVideoComment);
router.get("/read", GetVideoComments);
router.put("/update", UpdateVideoComment);
router.delete("/delete", DeleteVideoComment);

// ----------------- Comment's Routes -------------- END

export default router;