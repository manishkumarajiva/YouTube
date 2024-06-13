import SubscriptionModel from "../models/subscription.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Subscription's Handlers --------------- START

const ToggleSubscription = asyncHandler(async (req, res) => {
    const channelId = req.query.channelId;

    const subscribed = await SubscriptionModel.findOne({ subscriber : req.user?._id, channel : channelId });

    if(subscribed){
        const deleteSubscriber = await SubscriptionModel.findByIdAndDelete({ _id : subscribed._id });

        if(!deleteSubscriber){
            return res.status(200).json(new ErrorHandler(400, "Failed to Delete"));
        }

        return res
        .status(200)
        .json(new ResponseHandler(201, deleteSubscriber, "Successfully Deleted"))
    }

    const createSubscriber = await SubscriptionModel.create({ 
        channel : channelId,
        subscriber : req.user?._id
    })

    if(!createSubscriber){
        return res.status(200).json(new ErrorHandler(400, "Failed to Subscribed"));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createSubscriber, "Successfully Created"));
});


const GetUserChannelSubscriber = asyncHandler(async (req, res) => {

    const subscribers = await SubscriptionModel.find({ subscriber : req.user?._id });

    if(subscribers.length < 1){
        return res.status(200).json(new ErrorHandler(400, "Empty"));
    }

    const count = subscribers.length;

    return res
    .status(200)
    .json(new ResponseHandler(201, subscribers, count, "Successfully Fetch" ))
});


const GetUserSubscribedChannel = asyncHandler(async (req, res) => {

    const subscriptions = await SubscriptionModel.find({ subscriber : req.user?._id })

    if(subscriptions.length < 1){
        return res.status(200).json(new ErrorHandler(400, "Empty"));
    }

    const count = subscriptions.length;

    return res
    .status(200)
    .json(new ResponseHandler(201, subscriptions, count, "Successfully Fetch" ));
});

// --------------- Subscription's Handlers --------------- END


// Export Subscription Handlers
export{
    ToggleSubscription,
    GetUserChannelSubscriber,
    GetUserSubscribedChannel
};