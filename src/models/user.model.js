import mongoose from "mongoose";

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
    coverImage : {
        type : String,
        trim : true
    },
    avatar : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        trim : true
    },
    refreshToken : {
        type : String,
        trim : true
    },
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
    isAdmin : {
        type : Boolean,
        default : false
    }
},{ timestamps : true });


const UserModel = new mongoose.model("User",userSchema);
export default UserModel;