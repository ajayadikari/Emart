import mongoose from "mongoose";


const schema = mongoose.Schema({
    products:[{
        type: mongoose.ObjectId, 
        ref: 'product'
    }], 
    payment:{},

    buyer:{
        type: mongoose.ObjectId,
        ref: 'users'
    },
    status:{
        type: String, 
        default: 'Not Processed',
        enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancel']
    }
}, {timestamps: true})

const category = mongoose.model('order', schema)
export default category