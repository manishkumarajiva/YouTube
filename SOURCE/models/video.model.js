import mongoose from "mongoose";
import { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
    channel : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    video : {
        filename : {
            type : String,
            trim : true
        },
        url : {
            type : String,
            trim : true
        }
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
        filename : {
            type : String,
            trim : true
        },
        url : {
            type : String,
            trim : true
        }
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