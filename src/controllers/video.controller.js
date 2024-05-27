import VideoModel from "../models/video.model.js";
import asyncHandler from "../utils/asyncHandler.js";



// --------------- Video's Handlers --------------- START

const UploadChannelVideo = asyncHandler(async (req, res) => {
54
});


const GetVideoById = asyncHandler(async (req, res) => {

});


const GetChannelVideo = asyncHandler(async (req, res) => {

});


const UpdateChannelVideo = asyncHandler(async (req, res) => {

});


const PublishChannelVideo = asyncHandler(async (req, res) => {

});


const TogglePublicStatus = asyncHandler(async (req, res) => {

});


const DeleteChannelVideo = asyncHandler(async (req, res) => {

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