import mongoose from "mongoose";
import { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema({
    paidBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    paymentId : {
        type : String,
        trim : true,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        trim : true,
        required : true
    }
},{ timestamps : true });


const PaymentModel = new mongoose.model("Payment",paymentSchema);
export default PaymentModel;