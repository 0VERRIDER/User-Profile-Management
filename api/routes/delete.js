const express = require('express');
const router   = express.Router();
const Users = require('./models/users');

router.post('/',(req,res,next) => {
    const email = req.body.email;
    Users.deleteOne({email:email}).exec()
    .then(data =>{
        if(data['deletedCount']>0){
        res.status(200).json({message : email+"'s account has been deleted."});
        }
        else{
            throw "Email "+email +" not found in the database!"
        }
    //    res.status(200).json({data : data});

        
    }).catch(err =>{
        res.status(404).json({message: "Error occured while removing the user!",error: err});
    });
});


module.exports = router;