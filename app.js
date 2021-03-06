const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const viewRoute = require('./api/routes/view');
const createRoute = require('./api/routes/create');
const deleteRoute= require('./api/routes/delete');
const updateRoute= require('./api/routes/update');
const loginRoute= require('./api/routes/login');

const cors = require('cors');
const mongoAtlasUri = <MONGODB-URL>;
//mongoose connect
try{
mongoose.connect(mongoAtlasUri,{
    useNewUrlParser: true ,
    useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);
}
catch(error){
    app.use((req,res,next) =>{
        res.status(500).json({
            error:{
                message : "Something went wrong !",
                details : error
            }
        });
    handleError(error);
});
}
//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//cors fix
app.use(cors());
//cookie handler
app.use(cookieParser());
// main routes
app.use('/users/view', viewRoute);
app.use('/users/create', createRoute);
app.use('/users/delete',deleteRoute);
app.use('/users/update',updateRoute);
app.use('/login',loginRoute);



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
