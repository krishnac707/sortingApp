import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { AddProduct, AllProduct, FilterProduct } from './controllers/Product.controller.js';
import multer from 'multer';

const app = express()
const upload = multer({ dest: 'uploads/' })

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/uploads',express.static('uploads'))

app.get("/", (req, res) => {
    res.send("working");
})

app.post("/add-product",upload.single('image'),AddProduct);
app.get("/all-product",AllProduct);
app.get("/filter-product",FilterProduct)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to db");
})



app.listen(8000,()=>{
    console.log("port running on 8000");
})

