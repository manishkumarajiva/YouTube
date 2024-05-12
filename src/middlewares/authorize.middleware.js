import message from "../config/message.config.js";
import { VerifyToken } from "./authenticate.middleware.js";


const VerifyAdmin = async (err, req, res, next) => {
    try {
        VerifyToken(req, res, () => {
            if(req.user.isAdmin === true){
                next()
            }else{
                return res.status(401).json({ status : 401, message : message.unAuthorize });
            }
        })
    } catch (error) {
        res.status(500).json({ status : 500, message : message.catch , response : error.stack });
    }
};



const VerifyUser = async (err, req, res, next) => {
    try {
        VerifyUser(req, res, () => {
            if(req.user.isAdmin === false){
                next();
            }else{
                return res.status(401).json({ status : 401, message : message.unAuthorize });
            }
        })
    } catch (error) {
        res.status(500).json({ status : 500, message : message.catch , response : error.stack });
    }
};


export { VerifyAdmin, VerifyUser };