const express = require('express');
const app = express();
const viewRoutes = require('./api/routes/view');

//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//cors fix
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin',"*");//allowed access to all client
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});
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