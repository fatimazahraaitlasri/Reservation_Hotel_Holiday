const mongoose = require('mongoose')
const ChambreSchema = mongoose.Schema({
   
    capacity:{
        type:String,
        required:[true,"Please add a password field"]
    },
    num:{
        type:String,
        required:[true,"Please add a password field"]
    },
    Image:{
        data:Buffer,
        contentType:String,
    },

    
})
module.exports = mongoose.model("Chambre",ChambreSchema)