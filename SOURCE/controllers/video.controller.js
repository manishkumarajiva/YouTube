import VideoModel from "../models/video.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import UserModel from "../models/user.model.js";
import { CloudinaryUpload, CloudinaryDelete } from "../utils/cloudinary.util.js";
import msg from "../config/message.js";


// --------------- Video's Handlers --------------- START

const UploadChannelVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!req.file?.path) {
        return res.status(200).json(new ErrorHandler(401, "Please Select Video"));
    }

    const desgination = {
        path: req.file?.path,
        type: "video",
        folder: "/DevHub/Video/"
    }

    const video = await CloudinaryUpload(desgination);

    const NewVideo = {
        url : video.secure_url,
        public_id : video.public_id
    }

    const videoPlayload = {
        channel: req.user?._id,
        video : NewVideo,       
        title: title,
        description: description,
        duration: video.duration,
        size : video.bytes,
        width : video.width,
        height : video.height,
        format : video.format,
        frameRate : video.frame_rate,
        bitRate : video.bit_rate
    }

    const uploadVideo = await VideoModel.create(videoPlayload);
    if (!uploadVideo) {
        res.status(200).json(new ErrorHandler(500, "Failed to upload"));
    }

    return res.status(200).json(new ResponseHandler(201, uploadVideo, "Upload Successfully"));
});


const UpdateVideoThumbnail = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    if(!req.file?.path){
        return res.status(200).json(new ErrorHandler(401, "Please Select Thumbnail"));
    }

    const Video = await VideoModel.findById({ _id : videoId });


    if(Video.thumbnail.public_id){
        await CloudinaryDelete(Video.thumbnail.public_id);
    }

    const desgination = {
        path: req.file?.path,
        type: "image",
        folder: "/DevHub/Thumbnail/"
    }

    const thumbnail = await CloudinaryUpload(desgination);

    const thumbnailPayload = {
        image : thumbnail.secure_url,
        public_id : thumbnail.public_id
    }

    const uploadThumbnail = await VideoModel.findByIdAndUpdate({ _id : videoId }, { thumbnail : thumbnailPayload }, { new : true });
    if(!uploadThumbnail){
        return res.status(200).json(new ErrorHandler(401, "Failed to Upload"));
    }

    res.status(200).json(new ResponseHandler(200, uploadThumbnail, "Upload Successfully"));
});


const GetVideoById = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const video = await VideoModel.findById({ _id: videoId });
    if (!video) {
        throw new ErrorHandler(400, "Empty")
    }

    const user = await UserModel.findById({ _id: req.user?._id });

    user.watchHistory.push({ video: video._id });
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ResponseHandler(201, video, "Fetched Successfully"))
});


const GetChannelVideo = asyncHandler(async (req, res) => {

    const channelVideos = await VideoModel.find({ channel: req.user?._id })

    if (channelVideos.length < 1) {
        throw new ErrorHandler(400, msg.fread)
    }

    return res
        .status(200)
        .json(new ResponseHandler(201, channelVideos, msg.sread))

});


const UpdateVideoInfo = asyncHandler(async (req, res) => {

    const { videoId, title, description } = req.body;


    const updatePayload = new Object({
        title: title,
        description: description
    })

    const updateVideo = await VideoModel.findByIdAndUpdate({ _id: videoId }, updatePayload, { new: true });

    return res
        .status(200)
        .json(new ResponseHandler(201, updatePayload, msg.supdate))
});


const PublishChannelVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const publishvideo = await VideoModel.findByIdAndUpdate({ _id: videoId }, { isPublish: true }, { new: true });

    if (!publishvideo) {
        return res.status(200).json(new ErrorHandler(400, "Failed to publish"));
    }

    return res
        .status(200)
        .json(new ResponseHandler(201, publishvideo, "Publish Successfully"));
});


const TogglePublicStatus = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;
    let togglePublish;

    const video = await VideoModel.findById({ _id: videoId });

    if (video.isPublish) {
        togglePublish = await VideoModel.findByIdAndUpdate({ _id: videoId }, { isPublish: false }, { new: true });
    } else {
        togglePublish = await VideoModel.findByIdAndUpdate({ _id: videoId }, { isPublish: true }, { new: true });
    }


    if (!togglePublish) {
        return res.status(200).json(new ErrorHandler(400, "Failed to Toggle publish"));
    }

    return res
        .status(200)
        .json(new ResponseHandler(201, togglePublish, "Publish Successfully"));
});


const DeleteChannelVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const deleteVideo = await VideoModel.findByIdAndDelete({ _id: videoId });
    if (!deleteVideo) {
        return res.status(200).json(new ErrorHandler(400, msg.fdelete));
    }

    return res
        .status(200)
        .json(new ResponseHandler(201, deleteVideo, msg.sdelete));
});


const RemoveHistoryVideo = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const user = await UserModel.findById({ _id: req.user?._id });

    user.watchHistory.filter((value) => {
        return !value.video.equals(videoId);
    });

    const history = user.save({ validateBeforeSave: false });

    return res
        .status(200).
        json(new ResponseHandler(201, history, msg.sdelete));
});

// --------------- Video's Handlers --------------- END


// Export Video Handlers
export {
    UploadChannelVideo,
    UpdateVideoThumbnail,
    GetChannelVideo,
    GetVideoById,
    UpdateVideoInfo,
    PublishChannelVideo,
    TogglePublicStatus,
    DeleteChannelVideo,
    RemoveHistoryVideo
};
