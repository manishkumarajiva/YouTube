import LikeModel from "../models/like.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import msg from "../config/message.js";

// --------------- Like's Handlers --------------- START

const ToggleVideoLike = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;

    const like = await LikeModel.findOne({
        likedBy : req.user?._id,
        video : videoId
    })

    if(like){
        const deleteLike = await LikeModel.findByIdAndDelete({ _id : like._id })
        if(!deleteLike){
            return res.status(200).json(new ErrorHandler(400, msg.fdelete))
        }
        return res
        .status(200)
        .json(new ResponseHandler(201, deleteLike, msg.sdelete));
    }

    const createLike = await LikeModel.create({ 
        likedBy : req.user?._id,
        video : videoId
     })

    if(!createLike){
        return res.status(200).json(new ErrorHandler(400, msg.fcreate));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createLike, msg.screate));
});


const ToggleCommentLike = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;

    const comment = await LikeModel.findOne({
        likedBy : req.user?._id,
        comment : commentId
    })

    if(comment){
        const deleteComment = await LikeModel.findByIdAndDelete({ _id : comment._id });
        if(!deleteComment){
            return res.status(200).json(new ErrorHandler(400, msg.fdelete));
        }

        return res
        .status(200)
        .json(new ResponseHandler(201, deleteComment, msg.sdelete));
    }


    const createComment = await LikeModel.create({ 
        likedBy : req.user._id,
        comment : commentId
     })

    if(!createComment){
        return res.status(200).json(new ErrorHandler(400, msg.fcreate));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createComment, msg.screate));
});


const ToggleTweetLike = asyncHandler(async (req, res) => {
    const tweetId = req.query.tweetId;

    const tweet = await LikeModel.findOne({
        likedBy : req.user?._id,
        tweet : tweetId
    })

    if(tweet){
        const deletetweet = await LikeModel.findByIdAndDelete({ _id : tweet._id });

        if(!deletetweet){
            throw new ErrorHandler(400, "Failed to Delete");
        }

        return res
        .status(200)
        .json(new ResponseHandler(201, deletetweet, "Successfully Deleted"));
    }


    const createComment = await LikeModel.create({ 
        likedBy : req.user._id,
        tweet : tweetId
     })

    if(!createComment){
        throw new ErrorHandler(400, "Failed to Create");
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createComment, "Successfully Created"));
});


const GetLikedVideos = asyncHandler(async (req, res) => {

    const likedVideos = await LikeModel.find({ likedBy : req.user?._id });

    if(likedVideos.length < 1){
        return res.status(200).json(new ErrorHandler(401, msg.fread));
    }
    
    const count = likedVideos.length;

    const response = {
        count : count,
        videos : likedVideos
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, response, msg.sread));
});

// --------------- Like's Handlers --------------- END


// Export Like Handlers
export{
    ToggleVideoLike,
    ToggleCommentLike,
    ToggleTweetLike,
    GetLikedVideos
};
