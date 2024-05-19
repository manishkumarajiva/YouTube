import PlaylistModel from "../models/playlist.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from  "../utils/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Playlist's Handlers --------------- START

const CreateVideoPlaylist = asyncHandler(async (req, res) => {
    const { playlistName, description } = req.body;

    const createPlaylist = await PlaylistModel.create({
        channel : req.user?._id,
        name : playlistName,
        description : description
    })

    if(!createPlaylist){
        throw new ErrorHandler(400, "Failed to Create")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createPlaylist, "Successfully Created"))
});


const GetVideoPlaylists = asyncHandler(async (req, res) => {
    
    const channelPlaylist = await PlaylistModel.find().sort({ createdAt : -1 })

    if(channelPlaylist.length < 1){
        throw new ErrorHandler(400, "Empty Playlist")
    }

    const count = channelPlaylist.length;

    return res
    .status(200)
    .json(new ResponseHandler(201, channelPlaylist, count, "Successfully Fetched"))
});


const GetPlaylistById = asyncHandler(async (req, res) => {
    const playlistId = req.query.playlistId;

    const playlist = await PlaylistModel.findById({ _id : playlistId });

    if(!playlist){
        throw new ErrorHandler(400, "Not Found")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, playlist, "Successfully Fetched"))
});


const UpdateVideoPlaylist = asyncHandler(async (req, res) => {
    const { playlistName, description } = req.body;
    const playlistId = req.query.playlistId;

    const updatePayload = new Object({
        name : playlistName,
        description : description
    })

    const updatePlaylist = await PlaylistModel.findByIdAndUpdate({ _id : playlistId }, updatePayload, { new : true })

    if(!updatePayload){
        throw new ErrorHandler(400, "Failed to Update")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, updatePlaylist, "Successfully Updated"))
});


const DeleteVideoPlaylist = asyncHandler(async (req, res) => {
    const playlistId = req.query.playlistId;

    const deletePlaylist = await PlaylistModel.findByIdAndDelete({ _id : playlistId });

    if(!deletePlaylist){
        throw new ErrorHandler(400, "Failed to Delete")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deletePlaylist, "Successfully Deleted"))
});


const AddVideoToPlaylist = asyncHandler(async (req, res) => {

});


const RemoveVideoFromPlaylist = asyncHandler(async (req, res) => {

});

// --------------- Playlis's Handlers --------------- END


// Export Playlist Handler
export{
    CreateVideoPlaylist,
    GetVideoPlaylists,
    GetPlaylistById,
    UpdateVideoPlaylist,
    DeleteVideoPlaylist,
    AddVideoToPlaylist,
    RemoveVideoFromPlaylist
};


