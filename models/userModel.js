import mongoose from 'mongoose'


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, ['user name is required']],
        trim: true
    },
    email: {
        type: String,
        required: [true, ['email is required']],
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,
    },

},
    { timestamps: true }
)

export default mongoose.model('users', schema);