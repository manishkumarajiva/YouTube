import mongoose from "mongoose";
import { Schema } from "mongoose";

const tweetSchema = new mongoose.Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        trim : true,
        required : true
    }
},{ timestamps : true });


const TweetModel = new mongoose.model("Tweet",tweetSchema);
export default TweetModel;