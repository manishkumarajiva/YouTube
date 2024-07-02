import cloudinary from "../config/cloudnary.config";
import fs from "fs";
import ErrorHandler from "./errorHandler";


const UploadMediaService = async (mediafiles) => {

    try {
        const filePath = mediafiles.path;
        const options = {
            resourse_type : mediafiles.type
        }
    
        const uploadResponse = await cloudinary.uploader.upload(filePath, options);
        if(uploadResponse) return uploadResponse;

    } catch (error) {
        res.status(500).json(new ErrorHandler(500, "🔴 Cloudinary Error"));
    }
};

export default UploadMediaService;