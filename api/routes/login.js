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
    let email = req.body.email;
    let password = req.body.password;
    try{
        Users.findOne({ email: email }, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).json({
                    message: "Authentication error !"
                });
            }
            else
            {// test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw "2";
                if(isMatch)
                {res.status(200).json({
                    message: "User authenticated"
                });}
                else{
                    res.status(401).json({
                        message: "Authentication error !"
                    });
                }
            })}
        });
   
}
catch(err){
    res.status(500).json({
        error: err
    });
}
   

    
});


module.exports = router;