const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userData=require('../model/UserData');
const cors = require('cors');
router.use(cors());

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



router.post('/api/login', async (req, res) => {
    try {
       
        const email = req.body.email;
        const password = req.body.password;
        //console.log(email,password);
        const foundUser = await userData.findOne({ email, password });

        if (foundUser) {
            console.log("found : "+foundUser)
          let payload={email:email,password:password}
          let token=jwt.sign(payload,'reactblogapp');
            res.status(200).send({message:'success',token:token});
        } else {
            // res.status(401).send('Invalid credentials');
            res.status(400).send({massage:'Unauthorized'})
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});





router.get('/getUser',verifytoken,async(req,res)=>{
    try{
    const data=await userData.find();
    res.status(200).send(data)
    }
    catch(error)
    {
        res.status(400).send(error);
    }
});

router.post('/addUser',async(req,res)=>{
    try{
        var item=req.body;
        const Data= new userData(item);
        const savedata= await Data.save();
        res.status(200).send('Successfull')
    }
    catch(error){
        res.status(404).send('Error!!')
    }
   
})

router.put('/update/:id',verifytoken,async(req,res)=>{
    try {
        var item=req.body;
       const data= await userData.findByIdAndUpdate(req.params.id,item);
        res.status(200).send('Updated successfully');
    } catch (error) {
        res.status(404).send('Update not working');
    }
})

router.delete('/remove',verifytoken,(req,res)=>{
   // array1.pop();
    res.send(array1);
})
module.exports=router;