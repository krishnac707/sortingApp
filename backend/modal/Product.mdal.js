import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Product",productSchema)