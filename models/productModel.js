import mongoose from "mongoose";
import fs from 'fs'

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        required: true

    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,

    },
    shipping: {
        type: Boolean
    }
}, { timestamps: true })

const product = mongoose.model('product', schema)
export default product