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
    width : {
        type : Number,
        required : true
    },
    height : {
        type : Number,
        required : true
    },
    format : {
        type : String,
        required : true
    },
    size : {
        type : Number,
        required : true
    },
    frameRate : {
        type : Number,
        required : true
    },
    bitRate : {
        type : Number,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    tags : [
        {
            type : String
        }
    ],

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


    