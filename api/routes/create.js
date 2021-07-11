const express = require('express');
const router   = express.Router();
const Users = require('./models/users');
const mongoose = require('mongoose')
const Auth = require('./auth/auth');

//GET request handler for the create method
router.get('/',(req,res,next) => {

    res.status(200).json({
        message : "Hi there, its a POST API",
    });
});

//POSt request handler for the create method

router.post('/',Auth,(req,res,next) => {
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
        
    });
    user.save().then(result => {
       
        return res.status(201).json({
            message : "Thank you "+user.first_name+". Account registred successfully.",
            result: result
        });
    }).catch( err =>{
        try
        {res.status(200).json({
            message : err.keyPattern['email']>0? "User already exist" : "Invalid entries found",
        
        });
       
}
catch(err){
    res.status(200).json({
            error: "Invalid entries found"
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