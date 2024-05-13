import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Bcrypt from "bcryptjs";

// --------------- User's Handlers --------------- START

const RegisterUser = asyncHandler(async (req, res) => {

    const { firstname, username, email, password } = req.body;

    if([firstname, username, email, password].some((field) => field.trim() === "")){
        throw new ErrorHandler(401, "All fields are required")
    }

    const existedUser = await UserModel.findOne({ $or : [{username},{email}]});
    if(existedUser){
        throw new ErrorHandler(409, "User with Email or Username Already Exist")
    }

    const hashedPassword = await Bcrypt.hash(password,12);

    const createUser = await UserModel.create({
        fullname : fullname,
        username : username.toLowerCase(),
        email : email.toLowerCase(),
        password : hashedPassword
    });

    if(!createUser){
        throw new ErrorHandler(500, "Something went wrong during registeration");
    }

    return res
    .status(201)
    .json(new ResponseHandler(200, createUser, "User Register Successfully"));
});


const GetCurrentUser = asyncHandler(async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id);
    const userProfile = await UserModel.findById({ _id : userId });

    if(!userProfile){
        throw new ErrorHandler(500, "User Not Fount");
    }

    return res
    .status(200)
    .json( new ResponseHandler(200, userProfile, "Successfully Fetched"));
});


const UpdateUserAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;

    if(!fullname || !email){
        throw new ErrorHandler(400, "All fields are required");
    };

    const updateUser = await UserModel.findByIdAndUpdate(
        req.user?._id,
        { fullname : fullname, email : email },
        { new : true }
    ).select("-password");

    return res
    .status(200)
    .json(new ResponseHandler(200, updateUser, "User Update Successfully"));
});


const UpdateUserCoverImage = asyncHandler(async (req, res) => {

});


const UpdateUserAvatar = asyncHandler(async (req, res) => {

});


const GetWatchHistory = asyncHandler(async (req, res) => {

});

// --------------- User's Handlers --------------- END


// Export User Handlers
export { 
    RegisterUser, 
    GetCurrentUser, 
    UpdateUserAccountDetails,
    UpdateUserCoverImage,
    UpdateUserAvatar,
    GetWatchHistory
};