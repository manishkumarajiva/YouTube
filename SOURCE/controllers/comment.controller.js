import CommentModel from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import msg from "../config/message.js";


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
        return res.status(200).json(new ErrorHandler(400, msg.fcreate));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, createComment, msg.screate));
});


const GetVideoComments = asyncHandler(async (req, res) => {
    let { videoId, limit, page, top, order } = req.query;

    const videoComments = await CommentModel.find({ owner : req.user?._id, video: videoId }).populate("video")
    .skip((limit * page)).limit(limit).sort({ createdAt : Number(order) });

    const comments = await CommentModel.countDocuments();
    const pages = Math.ceil(comments/limit);
    const count = comments;

    if(count < 1){
        res.status(200).json(new ErrorHandler(400, msg.fread));
    }

    const response = {
        pages : pages,
        count : count,
        data : videoComments
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, response, msg.sread));
});


const UpdateVideoComment = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;
    const content = req.body.content;

    const updateComment = await CommentModel.findByIdAndUpdate({ _id : commentId }, { content : content }, { new : true });

    if(!updateComment){
        return res.status(200).json(new ErrorHandler(400, msg.fupdate));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, updateComment, msg.supdate));
});


const DeleteVideoComment = asyncHandler(async (req, res) => {
    const commentId = req.query.commentId;

    const deleteComment = await CommentModel.findByIdAndDelete({ _id : commentId });

    if(!deleteComment){
        return res.status(200).json(new ErrorHandler(400, msg.fdelete));
    }

    return res
    .status(200)
    .json(new ResponseHandler(201, deleteComment, msg.sdelete));
});

// --------------- Comment's Handlers --------------- END


// Export Comment Handlers
export{
    AddVideoComment,
    GetVideoComments,
    UpdateVideoComment,
    DeleteVideoComment
};
