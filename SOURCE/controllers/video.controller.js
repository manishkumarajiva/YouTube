import VideoModel from "../models/video.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import UserModel from "../models/user.model.js";
import msg from "../config/message.js";


// --------------- Video's Handlers --------------- START

const UploadChannelVideo = asyncHandler(async (req, res) => {
    const data = req.body;

    if(!(req.files && Array.isArray(req.files.video) && req.files.video[0]?.filename)){
        throw new ErrorHandler(401, "Please Select Video");
    }

    const Video = new Object({
        filename : req.files.video[0]?.filename,
        url : "http://localhost:8000/public/upload/video/"
    })

    if(!(req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail[0]?.filename)){
        throw new ErrorHandler(401, "Please Select Thumbnail");
    }

    const Thumbnail = new Object({
        filename : req.files.thumbnail[0]?.filename,
        url : "http://localhost:8000/public/upload/video/"
    })

    const videoPlayload = {
        channel : req.user?._id,
        title : data.title,
        description : data.description,
        duration : data.duration,
        video : Video,
        thumbnail : Thumbnail
    }

    const uploadVideo = await VideoModel.create(videoPlayload);
    if(!uploadVideo){
        throw new ErrorHandler(500, "Failed to upload");
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, uploadVideo, "Upload Successfully"));
});


const GetVideoById = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const video = await VideoModel.findById({ _id : videoId });
    if(!video){
        throw new ErrorHandler(400, "Empty")
    }

    const user = await UserModel.findById({ _id : req.user?._id });

    user.watchHistory.push({ video : video._id });
    await user.save({ validateBeforeSave : false });

    return res
    .status(200)
    .json(new ResponseHandler(201, video, "Fetched Successfully"))
});


const GetChannelVideo = asyncHandler(async (req, res) => {

    const channelVideos = await VideoModel.find({ channel : req.user?._id })

    if(channelVideos.length < 1){
        throw new ErrorHandler(400, msg.fread)
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, channelVideos, msg.sread))

});


const UpdateChannelVideo = asyncHandler(async (req, res) => {

    const { videoId, title, description } = req.body;
    const thumbnail = req.file?.filename;
    if(!thumbnail){
        throw new ErrorHandler(401, "Please Select Thumbnail");
    }

    const Thumbnail = new Object({
        filename : req.file?.filename,
        url : "http://localhost:8000/public/upload/video/"
    })
            

    const updatePayload = new Object({
        title : title,
        description : description,
        thumbnail : Thumbnail
    })

    const updateVideo = await VideoModel.findByIdAndUpdate({ _id : videoId }, updatePayload, { new : true });

    return res
    .status(200)
    .json(new ResponseHandler(201, updatePayload, msg.supdate))
});


const PublishChannelVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const publishvideo = await VideoModel.findByIdAndUpdate({ _id : videoId }, { isPublish : true }, { true : false });

    if(!publishvideo){
        return res.status(200).json(new ErrorHandler(400, "Failed to publish"));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, publishvideo, "Publish Successfully"));
});


const TogglePublicStatus = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;
    let togglePublish;

    const video = await VideoModel.findById({ _id : videoId });

    if(video.isPublish){
        togglePublish = await VideoModel.findByIdAndUpdate({ _id : videoId }, { isPublish : false }, { new : true });
    }else{
        togglePublish = await VideoModel.findByIdAndUpdate({ _id : videoId }, { isPublish : true }, { new : true });
    }


    if(!togglePublish){
        return res.status(200).json(new ErrorHandler(400, "Failed to Toggle publish"));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, togglePublish, "Publish Successfully"));
});


const DeleteChannelVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const deleteVideo = await VideoModel.findByIdAndDelete({ _id : videoId });
    if(!deleteVideo){
        return res.status(200).json(new ErrorHandler(400, msg.fdelete));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteVideo, msg.sdelete));
});


const RemoveHistoryVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const user = await UserModel.findById({ _id : req.user?._id });

    user.watchHistory.filter((value) => {
        return !value.video.equals(videoId);
    });

    const history = user.save({ validateBeforeSave : false });

    return res
    .status(200).
    json(new ResponseHandler(201, history, msg.sdelete));
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
    DeleteChannelVideo,
    RemoveHistoryVideo
};
