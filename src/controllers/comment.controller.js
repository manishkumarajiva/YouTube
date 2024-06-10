import CommentModel from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";



// --------------- Comment's Handlers --------------- START

const AddVideoComment = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;
    const content = req.body.content;


    const createComment = await CommentModel.create({
        owner : req.user?._id,
        video : videoId,
        content : content
    })

    if(!createComment){
        throw new ErrorHandler(400, "Failed to comment");
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createComment, "Comment Successfully Added"));
});


const GetVideoComments = asyncHandler(async (req, res) => {
    let { videoId, limit, page, top, newest } = req.query;

    const videoComments = await CommentModel.find({ owner : req.user?._id, video: videoId }).populate("video")
    // .skip(page).limit(limit).sort({ createdAt : newest });

    const comments = await CommentModel.documentCount();
    const pages = Math.ceil(comments/limit);
    const count = videoComments.length;

    if(videoComments.length < 1){
        throw new ErrorHandler(400, "Empty Comment")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, videoComments, "Video Comments"))
});


const UpdateVideoComment = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;
    const content = req.body.content;

    const updateComment = await CommentModel.findByIdAndUpdate({ _id : commentId }, { content : content }, { new : true });

    if(!updateComment){
        throw new ErrorHandler(400, "Failed to Update")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, updateComment, "Successfully Updated"))
});


const DeleteVideoComment = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;

    const deleteComment = await CommentModel.findByIdAndDelete({ _id : commentId });

    if(!deleteComment){
        throw new ErrorHandler(400, "Failed to Delete")
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteComment, "Successfully Deleted"))
});

// --------------- Comment's Handlers --------------- END


// Export Comment Handlers
export{
    AddVideoComment,
    GetVideoComments,
    UpdateVideoComment,
    DeleteVideoComment
};
