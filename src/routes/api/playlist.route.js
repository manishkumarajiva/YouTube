import { Router } from "express";
const router = Router();
import { CreateVideoPlaylist, GetPlaylistById, UpdateVideoPlaylist, DeleteVideoPlaylist } from "../../controllers/playlist.controller.js";
import { AddVideoToPlaylist, RemoveVideoFromPlaylist } from "../../controllers/playlist.controller.js";


// ----------------- Playlist's Routes -------------- START

router.post("/create", CreateVideoPlaylist);
router.get("getbyId", GetPlaylistById);
router.put("/update", UpdateVideoPlaylist);
router.delete("/delete", DeleteVideoPlaylist);
router.post("/addvideo", AddVideoToPlaylist);
router.delete("/removevideo", RemoveVideoFromPlaylist);

// ----------------- Playlist's Routes -------------- END

export default router;