const express = require('express');
const router   = express.Router();
const Users = require('./models/users');

//GET request handler for the VIEW method
router.get('/:email',(req,res,next) => {
const email = req.params.email;
Users.find({email:email}).exec()
.then(data =>{
    res.status(200).json({
        data :{
        first_name : data[0]['first_name'],
        middle_name : data[0]['middle_name'],
        last_name : data[0]['last_name'],
        email :data[0]['email'],
        hashed_password : data[0]['password'],
        role : data[0]['role'],
        department : data[0]['department'],
        created_time : data[0]['created_time']
        }
    });
}).catch(err =>{
    res.status(404).json({message: "User not found!",error:err});
});
});

//POSt request handler for the VIEW method

router.post('/',(req,res,next) => {
    const email = req.body.email;
    Users.find({email:email})
    .select('email password first_name middle_name last_name role department created_time updated_time')
    .exec()
    .then(datas =>{
        const response = {
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
            updated_time:  data['updated_time']

            }
       
        })
    };
    res.status(200).json(response);
    }).catch(err =>{
        res.status(404).json({message: "User not found!",error: err});
    });
});


module.exports = router;