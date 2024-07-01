import cloudinary from "../config/cloudnary.config";
import fs from "fs";
import ErrorHandler from "./errorHandler";


const UploadMediaService = async (mediafiles) => {

    try {
        const filePath = mediafiles.path;
        const options = {
    
        }
    
        const uploadResponse = await cloudinary.uploader.upload(filePath, options);
        if
    } catch (error) {
        res.status(500).json(new ErrorHandler(500, "🔴 Cloudinary Error"))
    }

}

export default UploadMediaService;