const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
}

})
module.exports=mongoose.model('user',userSchema)