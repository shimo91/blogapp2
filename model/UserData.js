const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    address:String,
    phone:Number,
    password:String
})
const UserData=mongoose.model('userlist',userSchema);
module.exports=UserData;