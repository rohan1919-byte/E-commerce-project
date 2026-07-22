import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fullname:String,
    phone:String,
    addressLine:String,
    city:String,
    state:String,
    pincode:String,
},{timestamps:true})

const Address = mongoose.model("Address",addressSchema);
export default Address;