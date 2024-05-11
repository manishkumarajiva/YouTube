import VideModel from "../models/video.model.js"
import LikeModel from "../models/like.model.js";
import SubscriptionModel from "../models/subscription.model.js"
import asyncHandler from "../utils/asyncHandler.js";



// --------------- Dashboard's Handlers --------------- START

const GetChannelStates = asyncHandler(async (req, res) => {

});


const GetChannelVideos = asyncHandler(async (req, res) => {

});

// --------------- Dashboard's Handlers --------------- END


// Export Dashboard Handler
export{
    GetChannelVideos,
    GetChannelStates
};
