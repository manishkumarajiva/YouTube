import VideoModel from "../models/video.model.js";
import LikeModel from "../models/like.model.js";
import SubscriptionModel from "../models/subscription.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Dashboard's Handlers --------------- START

const GetChannelStates = asyncHandler(async (req, res) => {
// Total Videos, Total Views, Total Subscriber, Total Likes

    const Videos = await VideoModel.find({ channel : req.user?._id })

    const Subscribers = await SubscriptionModel.find({ channelId : req.user?._id })

    const Likes = await LikeModel.find({ channel : req.user?._id })

    
   


});


const GetChannelVideos = asyncHandler(async (req, res) => {
    
    const ChannelVideos = await VideoModel.find({ channel : req.user?._id })

    if(ChannelVideos.length < 1){
        throw new ErrorHandler(400, "Empty")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, ChannelVideos, "Successfully Fetch"))
});

// --------------- Dashboard's Handlers --------------- END


// Export Dashboard Handler
export{
    GetChannelVideos,
    GetChannelStates
};
