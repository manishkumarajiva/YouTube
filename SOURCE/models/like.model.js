import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    likedBy : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    video : {
        type : Schema.Types.ObjectId,
        ref : "Video"    },
    comment : {
        type : Schema.Types.ObjectId,
        ref : "Comment"
    },
    tweet : {
        type : Schema.Types.ObjectId,
        ref : "Tweet"
    }
},{ timestamps : true });


const LikeModel = new mongoose.model("Like",likeSchema);
export default LikeModel;