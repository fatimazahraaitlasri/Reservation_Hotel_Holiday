const express = require('express') 
const app = express()
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require('cors');
// const {protectAdmin} =require('../Middleware/AdminMiddleware')

require("dotenv").config();

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 8000 
const connectDB = require("./Config/db");
connectDB();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.use('/Client', require('./Client/Routes/AuthClient'))  
app.use('/manager', require('./Manager/Routes/AuthManager')) 
app.use('/Admin',require('./Admin/Routes/AuthAdmin'))
// app.use('/chambre',require('./Chambre/Routes/AuthChambre'))


app.listen(PORT ,()=>console.log(`server runing on port ${PORT}`)) 

