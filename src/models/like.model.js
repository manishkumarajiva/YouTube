import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    likedBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    videoId : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    commentId : {
        type : Schema.Types.ObjectId,
        ref : "Comment"
    },
    tweetBy : {
        type : Schema.Types.ObjectId,
        ref : "Tweet"
    }
},{ timestamps : true });


const LikeModel = new mongoose.model("Like",likeSchema);
export default LikeModel;