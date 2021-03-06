const express = require('express');
const router   = express.Router();
const Users = require('./models/users');
const Auth = require('./auth/auth');
//GET request handler for the VIEW method


//POSt request handler for the VIEW method

router.post('/',Auth,(req,res,next) => {
    const email = req.body.email;
    const all = req.body.all;
    Users.find(all?req.userData.type == "user"?{role:"user"}: {} :req.userData.type == "user"?{email:email,role:"user"}:{email:email})
    .select('email password first_name middle_name last_name role department created_time updated_time')
    .exec()
    .then(datas =>{
        
        const response =datas.length>0 ? {
            count : datas.length,
            data :datas.map(data => { 
                return {
            first_name : data['first_name'],
            middle_name : data['middle_name'],
            last_name : data['last_name'],
            email :data['email'],
            hashed_password : data['password'],
            role : data['role'],
            department : data['department'],
            created_time : data['created_time'],
            updated_time:  data['updated_time'],
            }
       
        })
        
    }:{message: "No user found!"};
    
    res.status(200).json(response);
    }).catch(err =>{
        res.status(404).json({message: "User not found!",error: err});
    });
});


module.exports = router;