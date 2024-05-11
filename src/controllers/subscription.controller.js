import SubscriptionModel from "../models/subscription.model.js";
import asyncHandler from "../utils/asyncHandler.js";



// --------------- Subscription's Handlers --------------- START

const ToggleSubscription = asyncHandler(async (req, res) => {

});


const GetUserChannelSubscriber = asyncHandler(async (req, res) => {

});


const GetSubscribedChannel = asyncHandler(async (req, res) => {

});

// --------------- Subscription's Handlers --------------- END


// Export Subscription Handlers
export{
    ToggleSubscription,
    GetUserChannelSubscriber,
    GetSubscribedChannel
};