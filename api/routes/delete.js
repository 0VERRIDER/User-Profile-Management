const express = require('express');
const router   = express.Router();
const Users = require('./models/users');
const Auth = require('./auth/auth');

router.post('/',Auth,(req,res,next) => {
    const email = req.body.email;
    if(req.userData.email == email){
        res.status(200).json({message : "you can't delete your own account"});
    }
    else{
    Users.deleteOne(req.userData.type == "user"?{email:email,role:"user"}:{email:email}).exec()
    .then(data =>{
        if(data['deletedCount']>0){
        res.status(200).json({message : email+"'s account has been deleted."});
        }
        else{
            Users.find({email:email})
            .then(info=>{info.length>0?res.status(403).json({message: "Your not authorized to do this operation"}):res.status(404).json({message: "user not found"})})
            
            .catch(err=>{
                throw err
            });
        }
    //    res.status(200).json({data : data});

        
    }).catch(err =>{
        res.status(500).json({error: err});
    });
}
});


module.exports = router;