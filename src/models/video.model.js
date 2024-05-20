import mongoose from "mongoose";
import { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
    channel : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    video : {
        type : String,
        trim : true,
        required : true
    },
    title : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    thumbnail : {
        type : String,
        trim : true,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    views : {
        type : Number,
        required : true
    },
    isPublic : {
        type : Boolean,
        default : true
    }
},{ timestamps : true });


const VideoModel = new mongoose.model("Video",videoSchema);
export default VideoModel;