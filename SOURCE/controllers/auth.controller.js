import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ResponseHandler from "../utils/responseHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Bcrypt from "bcryptjs";
import msg from "../config/message.js";
import randomString from "randomstring";
import SendEmail from "../utils/ses.util.js";
import { generateRefreshAndAccessToken } from "../middlewares/authenticate.middleware.js";



// --------------- Auth's Handlers --------------- START


const LoginAuthentication = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email){
        return res.status(200).json(ErrorHandler(400, msg.payload));
    }

    const existUser = await UserModel.findOne({email});
    if(!existUser){
        return res.status(200).json(new ErrorHandler(400, msg.nfuser));
    }

    const comparePassword = await Bcrypt.compare(password, existUser.password);
    if(!comparePassword){
        return res.status(200).json(new ErrorHandler(400, msg.psnfmatch));
    }

    const { AuthAccessToken, AuthRefreshToken } =  await generateRefreshAndAccessToken(existUser);
    
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
    .json( new ResponseHandler(200, existUser, msg.slogin, AuthAccessToken));
});


const LogoutAuthentication = asyncHandler(async (req, res) => {

    const userLogout = await UserModel.findByIdAndUpdate(
        req.user?._id,
        { $unset : { refreshToken : 1 } },
        { new : true }
    )

    const cookieOption = {
        httpOnly : true, 
        secure : true, 
        path : "/", 
        domain : "localhost"
    }

    if(userLogout){
        return res
        .status(200)
        .clearCookie("AccessToken", cookieOption)
        .clearCookie("RefreshToken", cookieOption)
        .json( new ResponseHandler(200, {}, msg.slogout));
    }
});


const UpdateCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.user?._id);
    const comparePassword = await Bcrypt.compare(oldPassword, user.password);

    if(!comparePassword){
        return res.status(200).json(new ErrorHandler(400, msg.psnfmatch));
    }
    
    const hashedPassword = await Bcrypt.hash(newPassword,12);
    user.password = hashedPassword;
    const userUpdate = await user.save({ validateBeforeSave : false });


    const mailOptions = {
        from: "manishkumarajiva@gmail.com",
        to: userUpdate.email,
        subject : `Hi ${userUpdate.LoginAuthenticationfullname}, Your Registeration is successfully completed`,
        html : `<h1> Username : ${userUpdate.username} | New Password : ${password} </h1>`
    };

    const emailResp = await SendEmail(mailOptions);


    return res
    .status(200)
    .json( new ResponseHandler(200,{}, msg.psupdate));
});


//verificationToken / userId
const VerifyUserAccount = asyncHandler(async (req, res) => {
    const verificationToken = req.query.verificationToken;       

    const user = await UserModel.findOne({ verificationToken : verificationToken });
    if(!user){
        return res.status(200).json(ErrorHandler(400, msg.notFound));
    }

    const verifyPayload = new Object({
        verificationToken : "",
        isVerify : true
    })

    const verifyAccount = await UserModel.findByIdAndUpdate({ _id : user?._id }, verifyPayload, { new : true });
    if(!verifyAccount){
        return res.status(200).json(new ErrorHandler(409, "Failed To Verify"));
    }

    return res
    .status(200)
    .json( new ResponseHandler(201, verifyAccount, "Account Verify Successfully"));
});


const ForgetUserPassword = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const user = await UserModel.findOne({ email : email });
    if(!user){
        return res.status(200).json(new ErrorHandler(400, "User Not Found"));
    }

    const token = randomString.generate();

    const resetPasswordToken = new Object({
        resetPasswordToken : token
    });

    const setToken = await UserModel.findByIdAndUpdate({ _id : user?._id }, resetPasswordToken, { new : true });
    if(!setToken){
        return res.status(200).json(new ErrorHandler(409, "Failed to Set Forget Password Token"));
    }
    
    const mailOptions = {
        from: "manishkumarajiva@gmail.com",
        to: email,
        subject : `Hi ${fullname}, Create Your New Password`,
        html : `<a href="http://localhost:8000/api/V.YT.0.0.0.1/auth/resetPassword?${resetPasswordToken}"/>`
    };

    const emailResp = await SendEmail(mailOptions);

    return res
    .status(200)
    .json(new ResponseHandler(200,{},"Please Create New Password, Email has been send"));
});


const ResetUserPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = req.query.resetPasswordToken;
    const newPassword = req.body.newPassword;

    const user = await UserModel.findOne({ resetPasswordToken : resetPasswordToken });
    if(!user){
        return res.status(200).json(new ErrorHandler(400, "User Not Found"));
    }

    const hashedPassword = await Bcrypt.hash(newPassword,12);

    const resetPasswordPayload = new Object({
        resetPasswordToken : "",
        password : hashedPassword
    });

    const resetPassword = await UserModel.findOneAndUpdate({ resetPasswordToken : resetPasswordToken }, resetPasswordPayload, { new : true });
    if(!resetPassword){
        return res.status(200).json(new ErrorHandler(400, "Failed to Reset Password"));
    }

        
    const mailOptions = {
        from: "manishkumarajiva@gmail.com",
        to: email,
        subject : `Hi ${fullname}, Your Password Changed Successfully`,
        html : `<h1> Username : ${resetPassword.username} | Password ${newPassword} </h1>`
    };

    const emailResp = await SendEmail(mailOptions);
    
    return res
    .status(200)
    .json(new ResponseHandler(201, resetPassword, "Password Reset Successfully"));
});


const RefreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.RefreshToken || req.body.RefreshAccessToken;

    if(!incomingRefreshToken){
        return res.status(200).json(new ErrorHandler(401, "Unauthorized Request"));
    }

    const secretKey = process.env.YOUTUBE_SECRECT_KEY
    const decode = JWT.verify(incomingRefreshToken, secretKey);

    const user = await UserModel.findById({ _id : decode.id });
    if(!user){
        return res.status(200).json(new ErrorHandler(401, "Invalid Refresh Token"));
    }

    if(incomingRefreshToken !== user.refreshToken){
        return res.status(200).json(new ErrorHandler(401, "Refresh Token is expired or used"));
    }

    const { AuthAccessToken, AuthRefreshToken } = await generateRefreshAndAccessToken(user);

    const cookieOption = {
        httpOnly : true,
        secure : true,
        path : "/",
        domain : "localhost"
    }
    
    return res
    .status(200)
    .cookie("AccessToken", AccessToken, cookieOption)
    .cookie("RefreshToken", AuthRefreshToken, cookieOption)
    .json(new ResponseHandler(201, user, AuthAccessToken, AuthRefreshToken));
});

// --------------- Auth's Handlers --------------- END



// Export Auth Handlers
export {
    LoginAuthentication,
    LogoutAuthentication, 
    UpdateCurrentPassword,
    VerifyUserAccount,
    ForgetUserPassword,
    ResetUserPassword,
    RefreshAccessToken
};