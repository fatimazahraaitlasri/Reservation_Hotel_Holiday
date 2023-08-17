const mongoose = require('mongoose')
const ManagerSchema = mongoose.Schema({
   
    matricule:{
        type:String,
        required:[true,"Please add a email field"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add a password field"]
    },
    
})
module.exports = mongoose.model("Manager",ManagerSchema)