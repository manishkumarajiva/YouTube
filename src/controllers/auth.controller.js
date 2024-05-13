import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AccessToken, RefreshToken } from "../middlewares/authenticate.middleware.js";
import ErrorHandler from "../utils/errorHandler.js";
import Bcrypt from "bcryptjs";
import ResponseHandler from "../utils/responseHandler.js";


// --------------- Auth's Handlers --------------- START

const LoginAuthentication = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if(!(username && email)){
        throw new ErrorHandler(400, "Username or Email are required");
    }

    const existUser = await UserModel.findOne({ $or : [{username},{email}]});
    if(!existUser){
        throw new ErrorHandler(400, "User Not Found");
    }

    const comparePassword = await Bcrypt.compare(password, existUser.password);
    if(!comparePassword){
        throw new ErrorHandler(400, "Incorrect user credential");
    }

    const AuthAccessToken = await AccessToken(existUser);
    const AuthRefreshToken = await RefreshToken(existUser);

    existUser.refreshToken = AuthRefreshToken;
    existUser.save();
    
    const cookieOption = {
        httpOnly : true, 
        secure : true, 
        path : "/", 
        domain : "localhost"
    };

    return res
    .status(200)
    .cookie("AccessToken", AuthAccessToken, cookieOption)
    .cookie("RefreshToken", AuthRefreshToken, cookieOption)
    .json( new ResponseHandler(200, existUser, "Successfully Login", AuthAccessToken, AuthRefreshToken))

});


const LogoutAuthentication = asyncHandler(async (req, res) => {

    const userLogout = await UserModel.findByIdAndUpdate(
        req.user?._id,
        {
            $unset : { refreshToken : 1 }
        },
        { new : true }
    );

    const cookieOption = {
        httpOnly : true, 
        secure : true, 
        path : "/", 
        domain : "localhost"
    };

    if(userLogout){
        return res
        .status(200)
        .clearCookie("AccessToken", cookieOption)
        .clearCookie("RefreshToken", cookieOption)
        .json( new ResponseHandler(200, {}, "User Logged Out"))
    }

});


const UpdateCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.user?._id);
    const comparePassword = await Bcrypt.compare(oldPassword, user.password);

    if(!comparePassword){
        throw new ErrorHandler(400, "Incorrect Old Password");
    }
    
    const hashedPassword = await Bcrypt.hash(newPassword,12);
    user.password = hashedPassword;
    await user.save({ validateBeforeSave : false });

    return res
    .status(200)
    .json( new ResponseHandler(200,{}, "Password Changed Successfully"))
});


const ResetUserPassword = asyncHandler(async (req, res) => {

});


const RefreshAccessToken = asyncHandler(async (req, res) => {

});

// --------------- Auth's Handlers --------------- END



// Export Auth Handlers
export {
    LoginAuthentication,
    LogoutAuthentication, 
    UpdateCurrentPassword,
    ResetUserPassword,
    RefreshAccessToken
};