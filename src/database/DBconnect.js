import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";


const databaseConnection = (async (MONGODB_CONNECTION_STRING) => {
    try {
        const connectionInstance = await mongoose.connect(MONGODB_CONNECTION_STRING);
        if(!connectionInstance){
            throw new ErrorHandler(500,`MONGODB CONNECTION ERROR :: ${connectionInstance}`)
        }
        console.log(`DATABASE CONNECTED SUCCESS || ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error(`MONGODB ERROR :: ${error}`)
    }
})(process.env.MONGODB_URL)

export default databaseConnection;
