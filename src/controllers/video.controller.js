import VideoModel from "../models/video.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Video's Handlers --------------- START

const UploadChannelVideo = asyncHandler(async (req, res) => {
    const data = req.body;

    const videoPlayload = {
        channel : data.channelId,
        title : data.title,
        description : data.description,
        duration : data.duration,
        thumbnail : req.files.thumbnail[0].filename,
        video : req.files.video[0].filename
    }

    const uploadVideo = await VideoModel.create(videoPlayload)
    if(!uploadVideo){
        throw new ErrorHandler(401, "Failed to upload")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, uploadVideo, "Upload Successfully"))
});


const GetVideoById = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const video = await VideoModel.findById({ _id : videoId });
    if(!video){
        throw new ErrorHandler(400, "Empty")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, video, "Fetched Successfully"))
});


const GetChannelVideo = asyncHandler(async (req, res) => {

    const channelVideos = await VideoModel.find({ channel : req.user?._id })

    if(channelVideos.length < 1){
        throw new ErrorHandler(400, "Empty")
    }

    return res
    .statu(200)
    .json(new ResponseHandler(201, channelVideos, "Fetched Successfully"))

});


const UpdateChannelVideo = asyncHandler(async (req, res) => {

    const { videoId, title, description } = req.body;
    const thumbnail = req.file?.filename;
    let updateVideo;

    if(!thumbnail){
        updateVideo = await VideoModel.findByIdAndUpdate({ _id : videoId }, { title, description }, { new : true });
    }

    const updatePayload = new Object({
        title : title,
        description : description,
        thumbnail : thumbnail
    })

    updateVideo = await VideoModel.findByIdAndUpdate({ _id : videoId }, updatePayload, { new : true });

    return res
    .status(200)
    .json(new ResponseHandler(201, updatePayload, "Update Successfully"))
});


const PublishChannelVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const publishvideo = await VideoModel.findByIdAndUpdate({ _id : videoId }, { isPublish : true }, { true : false })

    if(!publishvideo){
        throw new ErrorHandler(400, "Failed to publish")
    }

    

});


const TogglePublicStatus = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;
    let togglePublish;

    const video = await VideoModel.findById({ _id : videoId })
    if(video.isPublish){
        togglePublish = await VideoModel.findByIdAndUpdate({ _id : videoId }, { isPublish : false }, { new : true });
    }else{
        togglePublish = await VideoModel.findByIdAndUpdate({ _id : videoId }, { isPublish : true }, { new : true });
    }


    if(!togglePublish){
        throw new ErrorHandler(400, "Failed to toggle publish")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, togglePublish, "Publish Successfully"))
});


const DeleteChannelVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const deleteVideo = await VideoModel.findByIdAndDelete({ _id : videoId })
    if(!deleteVideo){
        throw new ErrorHandler(400, "Failed to delete")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteVideo, "Deleted Successfully"))
});

// --------------- Video's Handlers --------------- END


// Export Video Handlers
export{
    UploadChannelVideo,
    GetChannelVideo,
    GetVideoById,
    UpdateChannelVideo,
    PublishChannelVideo,
    TogglePublicStatus,
    DeleteChannelVideo
};