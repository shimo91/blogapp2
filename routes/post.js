const express = require('express');
const router = express.Router();
const cors = require('cors');
const postData=require('../model/PostData');
router.use(cors());
const jwt = require('jsonwebtoken');

router.use(express.json());// what data type we are posting
router.use(express.urlencoded({extended:true})) // form


function verifytoken(req,res,next){
    try {
        const token = req.headers.token;
        if(!token) throw 'Unauthorized';
        let payload=jwt.verify(token,'reactblogapp');
        if(!payload) throw 'Unauthorized';
        //res.status(200).send(payload);
        next();
    } catch (error) {
        res.status(401).send('Error')
    }
}


router.get('/api//getPost',verifytoken,async(req,res)=>{
    try{
    const data=await postData.find();
    //console.log(data);
    res.status(200).send(data)
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.post('/api/addPost',verifytoken,async(req,res)=>{
    try{
        var item=req.body;
        const Data= new postData(item);
        const savedata= await Data.save();
        res.status(200).send('Post Successfull')
    }
    catch(error){
        res.status(404).send('Error!!')
    }
   
})

router.put('/update/:id',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
        console.log("item for update"+item);
       const data= await postData.findByIdAndUpdate(req.params.id,item);
        res.status(200).send('Updated successfully');
    } catch (error) {
        res.status(404).send('Update not working');
    }
})

router.delete('/api/remove/:id',verifytoken,async(req,res)=>{
   const id=req.params.id;
   //console.log(id);
   try{
    const savedata= await postData.findByIdAndDelete(id);
    res.status(200).send('Deleted Successfully')
}
catch(error){
    res.status(404).send('Error!!')
}
})
module.exports=router;