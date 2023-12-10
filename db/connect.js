const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/hospitaldb')
mongoose.connect('mongodb+srv://shimonaprakash:shimictakjul23@cluster0.v21na5t.mongodb.net/blogdb?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to blogdb');
})
.catch(()=>{
    console.log('Error!! No connection');
})