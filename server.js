import express from "express";
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import morgan from "morgan";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from 'cors'
import productRouter from './routes/productRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configuring env 
dotenv.config();

//rest object
const app = express()

//middlewares
app.use(morgan())
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build')))


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRouter)


app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//db connection
connectDb();

const PORT = process.env.PORT || 8080;


app.listen(PORT, (req, ress) => {
    console.log(`server is running at port: ${PORT}`.bgGreen.black);
})

