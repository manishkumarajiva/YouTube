// import "dotenv/config";
import express from "express";

const youtube = express();


const PORT = process.env.MONGO_PORT || 8000;


youtube.use(express.json());
youtube.use(express.urlencoded({ extended : true }));


youtube.listen(PORT, console.log(`YouTube App Listening on PORT :: ${PORT}`));