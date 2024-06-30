import TweetModel from "../models/tweet.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import msg from "../config/message.js";



// --------------- Tweet's Handlers --------------- START

const CreateUserTweet = asyncHandler(async (req, res) => {
    const content = req.body.content;

    if(!content.trim()){
        return res.status(200).json(new ResponseHandler(400, msg.payload));
    }

    const createTweet = await TweetModel.create({ 
        owner : req.user?._id,
        content : content
    })

    if(!createTweet){
        return res.status(200).json(new ErrorHandler(401, msg.fcreate));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createTweet, msg.screate));
});


const GetUserTweets = asyncHandler(async (req, res) => {

    const userTweet = await TweetModel.find({ owner : req.user?._id })

    if(userTweet.length < 0){
        return res.status(200)
        .json(new ResponseHandler(409, userTweet, msg.fread));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, userTweet, msg.sread));
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
        return res.status(200).json(new ErrorHandler(401, msg.fupdate));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, updateTweet, msg.supdate));
});


const DeleteUserTweet = asyncHandler(async (req, res) => {
    const tweetId = req.query.tweetId;

    const deleteTweet = await TweetModel.findByIdAndDelete({ _id : tweetId });

    if(!deleteTweet){
        return res.status(200).json(new ErrorHandler(401, msg.fdelete));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteTweet, msg.sdelete));
});

// --------------- Tweet's Handlers --------------- END


// Export Tweet Handlers
export {
    CreateUserTweet,
    GetUserTweets,
    UpdateUserTweet,
    DeleteUserTweet
};