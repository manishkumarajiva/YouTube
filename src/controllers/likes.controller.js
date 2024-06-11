import LikeModel from "../models/like.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";


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
            throw new ErrorHandler(400, "Failed to Delete")
        }
        return res
        .status(200)
        .json(new ResponseHandler(201, deleteLike, "Successfully Deleted"));
    }

    const createLike = await LikeModel.create({ 
        likedBy : req.user?._id,
        video : videoId
     })

    if(!createLike){
        throw new ErrorHandler(400, "Failed to Create");
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createLike, "Successfully Created"));
});


const ToggleCommentLike = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;

    const comment = await LikeModel.findOne({
        likedBy : req.user._id,
        commentId : commentId
    })

    if(comment){
        const deleteComment = await LikeModel.findByIdAndDelete({ _id : comment._id });
        if(!deleteComment){
            throw new ErrorHandler(400, "Failed to Delete");
        }

        return res
        .status(200)
        .json(new ResponseHandler(201, deleteComment, "Successfully Deleted"));
    }


    const createComment = await LikeModel.create({ 
        likedBy : req.user._id,
        commentId : commentId
     })

    if(!createComment){
        throw new ErrorHandler(400, "Failed to Create");
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createComment, "Successfully Created"));
});


const ToggleTweetLike = asyncHandler(async (req, res) => {
    const tweetId = req.query.tweetId;

    const tweet = await LikeModel.findOne({
        likedBy : req.user._id,
        tweetId : tweetId
    })

    if(tweet){
        const deletetweet = await LikeModel.findByIdAndDelete({ _id : tweet._id })
        if(!deletetweet){
            throw new ErrorHandler(400, "Failed to Delete")
        }
        return res
        .status(200)
        .json(new ResponseHandler(201, deletetweet, "Successfully Deleted"))
    }


    const createComment = await LikeModel.create({ 
        likedBy : req.user._id,
        tweetId : tweetId
     });

    if(!createComment){
        throw new ErrorHandler(400, "Failed to Create")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createComment, "Successfully Created"))

});


const GetLikedVideos = asyncHandler(async (req, res) => {

    const likedVideos = await LikeModel.find({ likedBy : req.user._id });

    if(likedVideos.length < 1){
        throw new ErrorHandler(401, "Empty Likes")
    }
    
    const count = likedVideos.length;

    return res
    .status(200)
    .json(new ResponseHandler(201, count, likedVideos, "Successfully Fetch"))
});

// --------------- Like's Handlers --------------- END


// Export Like Handlers
export{
    ToggleVideoLike,
    ToggleCommentLike,
    ToggleTweetLike,
    GetLikedVideos
};
