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
        trim : true
    },
    thumbnail : {
        type : String,
        trim : true
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
    duration : {
        type : Number,
        required : true
    },
    views : {
        type : Number,
        default : 0
    },
    isPublish : {
        type : Boolean,
        default : false
    }
},{ timestamps : true });


const VideoModel = new mongoose.model("Video",videoSchema);
export default VideoModel;