import mongoose from "mongoose";


const databaseConnection = (async (MONGODB_CONNECTION_STRING) => {
    try {
    
    } catch (error) {
        console.error(`MONGODB ERROR :: ${error}`)
    }
})(process.env.MONGODB_URL)


