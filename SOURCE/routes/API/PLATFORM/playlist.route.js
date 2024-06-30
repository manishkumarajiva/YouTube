import { Router } from "express";
const router = Router();
import { CreateVideoPlaylist, GetVideoPlaylists, UpdateVideoPlaylist, DeleteVideoPlaylist } from "../../controllers/playlist.controller.js";
import { AddVideoToPlaylist, RemoveVideoFromPlaylist } from "../../controllers/playlist.controller.js";


// ----------------- Playlist's Routes -------------- START

router.post("/create", CreateVideoPlaylist);
router.get("/fetch", GetVideoPlaylists);
router.put("/update", UpdateVideoPlaylist);
router.delete("/delete", DeleteVideoPlaylist);
router.post("/addvideo", AddVideoToPlaylist);
router.delete("/removevideo", RemoveVideoFromPlaylist);

// ----------------- Playlist's Routes -------------- END

export default router;