const express = require('express');
const router   = express.Router();
const Users = require('./models/users');

//GET request handler for the VIEW method
router.get('/:userId',(req,res,next) => {
const id = req.params.userId;
Users.findById(id).exec()
.then(data =>{
    res.status(200).json(data);
}).catch(err =>{
    req.status(500).json({error: err});
});
});

//POSt request handler for the VIEW method

router.post('/',(req,res,next) => {
    res.status(200).json({
        message : "Hi "
    });
});


module.exports = router;