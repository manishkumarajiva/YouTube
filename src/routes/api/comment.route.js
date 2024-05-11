import { Router } from "express";
const router = Router();
import { AddVideoComment, GetVideoComment, UpdateVideoComment, DeleteVideoComment } from "../../controllers/comment.controller.js";


// ----------------- Comment's Routes -------------- START

router.post("/create", AddVideoComment);
router.get("/read", GetVideoComment);
router.put("/update", UpdateVideoComment);
router.delete("/delete", DeleteVideoComment);

// ----------------- Comment's Routes -------------- END

export default router;