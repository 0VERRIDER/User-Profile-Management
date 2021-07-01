const express = require('express');
const app = express();
const viewRoutes = require('./api/routes/view');



// main routes
app.use('/users/view', viewRoutes);




//error handlers
app.use((req,res,next) =>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error); // forwards the error request
});


app.use((error,req,res,next) =>{
    res.status(error.status || 500 );
    res.json({
        error:{
            message : error.message
        }
    });
});

module.exports = app;