import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
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
        type : String,
        trim : true
    },
    avatar : {
        type : String,
        trim : true
    },
    watchHistory : [
        {
            video : {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        }
    ],
    googleId : {
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