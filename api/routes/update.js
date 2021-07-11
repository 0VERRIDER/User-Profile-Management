const express = require('express');
const router   = express.Router();
const Users = require('./models/users');
const Auth = require('./auth/auth');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

router.post('/',Auth,(req,res,next) => {
    let errorCode=404;

    try{
    const email = req.body.email;
    const body = req.body;
    if(body.hasOwnProperty("updated_time") || body.hasOwnProperty("created_time") || body.hasOwnProperty("id") || body.hasOwnProperty("password") ){
        errorCode = 403;
        throw "Invalid entries found!";
    }
    else if(!body.hasOwnProperty("email")){
        errorCode = 404;
        throw "User not found!";
    }
    if (req.userData.type == "user" && req.body.role == "admin"){
        errorCode = 403;
        throw "You're not authorized to create an administrator level user !";
    }
    body['updated_time'] = Date.now();
    delete body.password;

    delete body.email;
    Users.updateOne(req.userData.type == "user" ? {email:email,role:"user"}:{email:email,role:"admin"},body).exec()
    .then(data =>{
        if(data.nModified >0)
        {res.status(200).json({message : email+"'s account has been updated."    });
}
else{
    Users.find({email:email}).then(dat => {dat.length>0? res.status(403).json({message :"You're not authorized to edit an administrator level user !"
    }):res.status(404).json({message :"User not found!"})});

}
    


        
    }).catch(err =>{
        res.status(404).json({error: err});
    });

    }
    catch(err){
        res.status(errorCode).json({error: err});

    }
});


module.exports = router;