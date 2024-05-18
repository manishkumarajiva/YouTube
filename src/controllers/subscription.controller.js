import SubscriptionModel from "../models/subscription.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Subscription's Handlers --------------- START

const ToggleSubscription = asyncHandler(async (req, res) => {
    const { subscriberId, channelId } = req.body;

    const subscribed = await SubscriptionModel.findOne({ subscriberId : subscriberId, channelId : channelId });

    if(subscribed){
        const deleteSubscriber = await SubscriptionModel.findByIdAndDelete({ _id : subscribed._id });

        if(!deleteSubscriber){
            throw new ErrorHandler(400, "Failed to Delete")
        }

        return res
        .status(200)
        .json(new ResponseHandler(201, deleteSubscriber, "Successfully Deleted"))
    }

    const deleteSubscriber = await SubscriptionModel.findByIdAndDelete({ _id : subscribed._id });

    if(!deleteSubscriber){
        throw new ErrorHandler(400, "Failed to Delete")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteSubscriber, "Successfully Deleted"))
});


const GetUserChannelSubscriber = asyncHandler(async (req, res) => {
    const channelId = req.query.channelId;

    const subscribers = await SubscriptionModel.find({ channelId : channelId });

    if(subscribers.length < 1){
        throw new ErrorHandler(400, "Empty")
    }

    const count = subscribers.length;

    return res
    .status(200)
    .json(new ResponseHandler(201, subscribers, count, "Successfully Fetch" ))
});


const GetUserSubscribedChannel = asyncHandler(async (req, res) => {
    const subscriberId = req.query.subscriberId;

    const subscriptions = await SubscriptionModel.find({ subscriberId : subscriberId })

    if(subscriptions.length < 1){
        throw new ErrorHandler(400, "Empty")
    }

    const count = subscriptions.length;

    return res
    .status(200)
    .json(new ResponseHandler(201, subscriptions, count, "Successfully Fetch" ))
});

// --------------- Subscription's Handlers --------------- END


// Export Subscription Handlers
export{
    ToggleSubscription,
    GetUserChannelSubscriber,
    GetUserSubscribedChannel
};