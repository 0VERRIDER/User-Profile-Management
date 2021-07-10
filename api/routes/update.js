const express = require('express');
const router   = express.Router();
const Users = require('./models/users');
const Auth = require('./auth/auth');

router.post('/',Auth,(req,res,next) => {
    let errorCode=404;

    try{
    const email = req.body.email;
    const body = req.body;
    if(body.hasOwnProperty("updated_time") || body.hasOwnProperty("created_time") || body.hasOwnProperty("id") ){
        errorCode = 403;
        throw "Invalid entries found!";
    }
    else if(!body.hasOwnProperty("email")){
        errorCode = 404;
        throw "User not found!";
    }
    body['updated_time'] = Date.now();
    delete body.email;
    Users.updateOne({email:email},body).exec()
    .then(data =>{
        res.status(200).json({message : email+"'s account has been updated.",
    changes: body
    });

        
    }).catch(err =>{
        res.status(404).json({error: err});
    });

    }
    catch(err){
        res.status(errorCode).json({error: err});

    }
});


module.exports = router;