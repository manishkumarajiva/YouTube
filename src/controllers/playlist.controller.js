import PlaylistModel from "../models/playlist.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from  "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Playlist's Handlers --------------- START

const CreateVideoPlaylist = asyncHandler(async (req, res) => {
    const { playlistName, description } = req.body;

    const isExist = await PlaylistModel.findOne({ name : playlistName.toLowerCase() });
    if(isExist){
        return res.status(200).json(new ErrorHandler(401, "Already Exists"));
    }

    const createPlaylist = await PlaylistModel.create({
        channel : req.user?._id,
        name : playlistName.toLowerCase(),
        description : description
    })

    if(!createPlaylist){
        return res.status(200).json(new ErrorHandler(400, "Failed to Create"));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createPlaylist, "Successfully Created"));
});


const GetVideoPlaylists = asyncHandler(async (req, res) => {
    const playlistId = req.query.playlistId;
    let channelPlaylist;

    if(!playlistId){
        channelPlaylist = await PlaylistModel.find({ channel : req.user?._id }).sort({ createdAt : -1 });
    }else{
        channelPlaylist = await PlaylistModel.findById({ _id : playlistId }).sort({ createdAt : -1 });
    }
    

    if(channelPlaylist.length < 1){
        return res.statu(200).json(new ErrorHandler(400, "Empty Playlist"));
    }

    const count = channelPlaylist.length;


    return res
    .status(200)
    .json(new ResponseHandler(201, channelPlaylist, "Successfully Fetched"));
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
    const { playlistId, videoId } = req.query;

    const playlist = await PlaylistModel.findById({ _id : playlistId })

    if(!playlist){
        throw new ErrorHandler(400, "Not Found")
    }

    const AddVideo = { videoId : videoId }
    playlist.videos.push(AddVideo)

    const NewVideo = await playlist.save();

    return res
    .status(200)
    .json(new ResponseHandler(201, NewVideo, "Successfully Added" ))

});


const RemoveVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.query;

    const playlist = await PlaylistModel.findById({ _id : playlistId })

    if(!playlist){
        throw new ErrorHandler(400, "Not Found")
    }

    const RemoveVideo = videoId;
    playlist.videos.pop(RemoveVideo)

    const DeletedVideo = await playlist.save()

    return res
    .status(200)
    .json(new ResponseHandler(201, DeletedVideo, "Successfully Deleted"))
});

// --------------- Playlis's Handlers --------------- END


// Export Playlist Handler
export{
    CreateVideoPlaylist,
    GetVideoPlaylists,
    UpdateVideoPlaylist,
    DeleteVideoPlaylist,
    AddVideoToPlaylist,
    RemoveVideoFromPlaylist
};


