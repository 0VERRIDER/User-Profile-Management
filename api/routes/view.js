const express = require('express');
const router   = express.Router();

//GET request handler for the VIEW method
router.get('/',(req,res,next) => {

    const user = {
        name : req.body.name,
        role : req.body.role
    }
    res.status(200).json({
        user_id : "Hi ",
        content : user
    });
});

//POSt request handler for the VIEW method

router.post('/',(req,res,next) => {
    res.status(200).json({
        message : "Hi "
    });
});


module.exports = router;