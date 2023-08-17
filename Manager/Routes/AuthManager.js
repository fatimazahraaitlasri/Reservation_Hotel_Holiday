const express = require('express')
const Router = express.Router()
const multer = require("multer");
const isManager = require("../Middleware/ManagerMiddleware")

const { loginManager  } = require('../Controller/ManagerController');

// const Storege = multer.diskStorage({
//     destination : (req, file, cb)=>{
//         cb(null , 'uploads')
//     },
//     filename : (req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
// const upload = multer ({storage:Storege})
Router.post('/login',loginManager);
module.exports = Router 