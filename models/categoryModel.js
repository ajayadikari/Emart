import mongoose from "mongoose";


const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name is required'],
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true
    }
})


const category = mongoose.model('category', schema)
export default category