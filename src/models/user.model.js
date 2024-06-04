import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        trim : true
    },
    username : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        trim : true
    },
    mobile : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        trim : true
    },
    coverImage : {
        filename : {
            type : String,
            trim : true
        },
        url : {
            type : String,
            trim : true
        }
    },
    avatar : {
        filename : {
            type : String,
            trim : true
        },
        url : {
            type : String,
            trim : true
        }
    },
    cloudnaryCoverImage : {
        type : String,
        trim : true
    },
    cloudnaryAvatar : {
        type : String,
        trim : true
    },
    watchHistory : [
        {
            videoId : {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        }
    ],
    googleId : {
        type : String,
        trim : true
    },
    facebookId : {
        type : String,
        trim : true
    },
    appleId : {
        type : String,
        trim : true
    },
    slackId : {
        type : String,
        trim : true
    },
    githubId : {
        type : String,
        trim : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    refreshToken : {
        type : String,
        trim : true
    },
    verificationToken : {
        type : String,
        trim : true
    },
    resetPasswordToken : {
        type : String,
        trim : true
    }
},{ timestamps : true });


const UserModel = new mongoose.model("User",userSchema);
export default UserModel;