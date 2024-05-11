import mongoose from "mongoose";
import { Schema } from "mongoose";

const playlistSchema = new mongoose.Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    name : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    videos : [
        {
            videoId : Schema.Types.ObjectId,
            ref : "Video"
        }
    ]
},{ timestamps : true });


const PlaylistModel = new mongoose.model("Playlist",playlistSchema);
export default PlaylistModel;