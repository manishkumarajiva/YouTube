import mongoose from "mongoose";
import { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriber : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    channel : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
},{ timestamps : true });


const SubscriptionModel = new mongoose.model("Subscription",subscriptionSchema);
export default SubscriptionModel;