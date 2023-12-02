import mongoose from 'mongoose'
import colors from 'colors'


const connectDb = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`connected to mongodb database : ${conn.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Error in mongodb: ${error}`.bgRed);
    }
}

export default connectDb;