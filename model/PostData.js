const mongoose = require('mongoose');
const postSchema=mongoose.Schema({
    title:String,
    post:String,
    imageUrl:String,
    date_updata:Date
})
const PostData=mongoose.model('post',postSchema);
module.exports=PostData;