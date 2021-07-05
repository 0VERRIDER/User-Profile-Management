const express = require('express');
const router   = express.Router();
const Users = require('./models/users');
const mongoose = require('mongoose')
//GET request handler for the create method
router.get('/',(req,res,next) => {

    const user = {
        name : req.body.name,
        role : req.body.role
    }
    res.status(200).json({
        message : "Hi there, its a POST API",
    });
});

//POSt request handler for the create method

router.post('/',(req,res,next) => {
    try{
    const user = new Users({
        _id: mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        email : req.body.email,
        password: req.body.password,
        role: req.body.role,
        department : req.body.department,
        created_time:  Date.now(),
        updated_time:  Date.now()
    });
    user.save().then(result => {
       
        res.status(201).json({
            message : "Thank you "+user.first_name+". Account registred successfully.",
            result: result
        });
    }).catch( err =>{
        if(err.keyPattern['email']>0){
        res.status(500).json({
            error: "User already exist with the mail id ' "+user.email+ "'"
        });
    }
        else{
            res.status(500).json({
                error: err
            });
        }
    
    });
   
}
catch(err){
    res.status(500).json({
        error: err
    });
}
   

    
});


module.exports = router;