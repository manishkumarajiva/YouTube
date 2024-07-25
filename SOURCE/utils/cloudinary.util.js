import cloudinary from "../config/cloudnary.config.js";
import fs from "fs";
import path from "path";
import ErrorHandler from "../utils/errorHandler.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)



const CloudinaryUpload = async (mediafile) => {
        const options = {
            resource_type : mediafile.type,
            folder : mediafile.folder
        }
        
        const path = mediafile.path;
        const uploadResponse = await cloudinary.uploader.upload(path, options);
        fs.unlinkSync(path);
        return uploadResponse;
};


const CloudinaryDelete = async (filepath) => {
    const deleteResponse = await cloudinary.uploader.destroy(filepath);
    return deleteResponse;
}

export {CloudinaryUpload, CloudinaryDelete };