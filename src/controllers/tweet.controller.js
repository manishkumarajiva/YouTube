import TweetModel from "../models/tweet.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Tweet's Handlers --------------- START

const CreateUserTweet = asyncHandler(async (req, res) => {
    const content = req.body.content;

    if(!content.trim()){
        return res.status(200).json(new ResponseHandler(400, "Content is empty"));
    }

    const createTweet = await TweetModel.create({ 
        owner : req.user?._id,
        content : content
    })

    if(!createTweet){
        throw new ErrorHandler(401, "Failed to create Tweet")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createTweet, "Tweet Successfully Created"))
});


const GetUserTweets = asyncHandler(async (req, res) => {

    const userTweet = await TweetModel.find({ owner : req.user?._id })

    if(userTweet.length < 0){
        return res.status(200)
        .json(new ResponseHandler(409, userTweet, "Empty Tweets"))
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, userTweet, "User Tweet"))
});


const UpdateUserTweet = asyncHandler(async (req, res) => {
    const tweetId = req.query.tweetId;
    const content = req.body.content;

    const updateTweet = await TweetModel.findByIdAndUpdate(
        { _id : tweetId },
        { content : content },
        { new : true }
    )

    if(!updateTweet){
        throw new ErrorHandler(401, "Failed to update Tweet")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, updateTweet, "Successfully Update"))
});


const DeleteUserTweet = asyncHandler(async (req, res) => {
    const tweetId = req.query.tweetId;

    const deleteTweet = await TweetModel.findByIdAndDelete({ _id : tweetId });

    if(!deleteTweet){
        throw new ErrorHandler(401, "Failed to delete Tweet")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteTweet, "Successfully Delete"))
});

// --------------- Tweet's Handlers --------------- END


// Export Tweet Handlers
export {
    CreateUserTweet,
    GetUserTweets,
    UpdateUserTweet,
    DeleteUserTweet
};