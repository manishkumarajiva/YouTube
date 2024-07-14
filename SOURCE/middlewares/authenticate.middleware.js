import JWT from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import ErrorHandler from '../utils/errorHandler.js';
import ResponseHandler from '../utils/responseHandler.js';


// Access Token
const AccessToken = async (user) => {
    return new Promise((resolve, reject) => {

        const payload = {
            id : user._id ?? user.id,
            email : user.email,
            name : user.fullname
        }

        const optons = {
            issuer : process.env.YOUTUBE_ISSUER,
            expiresIn : process.env.YOUTUBE_ACCESS_TOKEN_EXPIRY
        }
    
        const secrectKey = process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY;
        JWT.sign(payload, secrectKey, optons, (error, token) => {
            if(error) throw error;
            resolve(token);
        })
    })
};




// Refresh Token
const RefreshToken = async (user) => {
    return new Promise((resolve, reject) => {

        const payload = {
            id : user._id,
            email : user.email,
            name : user.fullname
        }
    
        const optons = {
            issuer : process.env.YOUTUBE_ISSUER,
            expiresIn : process.env.YOUTUBE_REFRESH_TOKEN_EXPIRY
        }
    
        const secrectKey = process.env.YOUTUBE_REFRESH_TOKEN_SECRECT_KEY;
    
        JWT.sign(payload, secrectKey, optons, (error, token) => {
            if(error) throw error;
            resolve(token);
        })
    })
};



// Verify Token
const VerifyToken = async (req, res, next) => {
    const Token = req.headers.authorization;
    if(!Token) return res.status(200).json(new ResponseHandler(500, "Please Login To Access"));

    const bearerToken = Token.split(" ");
    const bearer = bearerToken[0];
    const token = bearerToken[1];

    if(bearer !== "bearer") return res.status(200).json(new ResponseHandler(401,"Incorrect Session Token"));

    const decode =  JWT.verify(token, process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY);
    const existUser = await UserModel.findById({ _id : decode.id });
    req.user = existUser;
    next();
};



const generateRefreshAndAccessToken = async (user) => {
    try {
        const AuthAccessToken = await AccessToken(user);
        const AuthRefreshToken = await RefreshToken(user);
    
        const saveRefreshToken = await UserModel.findById({ _id : user._id });

        saveRefreshToken.refreshToken = AuthRefreshToken;
        await saveRefreshToken.save({ validateBeforeSave : false });
    
        return ({ AuthAccessToken, AuthRefreshToken });
    } catch (error) {
        return res.status(200).json(new ErrorHandler(400, "Session Token :: Something Went Wrong"));
    }
};
export { AccessToken, VerifyToken, generateRefreshAndAccessToken };