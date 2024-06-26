import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    video : {
        type : Schema.Types.ObjectId,
        ref : "Video",
        required : true
    },
    content : {
        type : String,
        trim : true,
        required : true
    }
},{ timestamps : true });


const CommentModel = new mongoose.model("Comment",commentSchema);
export default CommentModel;