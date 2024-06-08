import JWT from 'jsonwebtoken';
import UserModel from "../models/user.model.js";
import ErrorHandler from '../utils/errorHandler.js';


// Access Token
const AccessToken = async (user) => {
    return new Promise((resolve, reject) => {

        const payload = {
            id : user._id,
            email : user.email,
            name : user.username
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
            name : user.username
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
    if(!Token) throw new ErrorHandler(500, "Please Login To Access");

    const bearerToken = Token.split(" ");
    const bearer = bearerToken[0];
    const token = bearerToken[1];

    if(bearer !== "bearer") return res.status(200).json(new ErrorHandler(401,"Incorrect Session Token"));

    const decode =  JWT.verify(token, process.env.YOUTUBE_ACCESS_TOKEN_SECRECT_KEY);
    const existUser = await UserModel.findById({ _id : decode.id });
    req.user = existUser;
    next();
};


export { AccessToken, RefreshToken, VerifyToken };