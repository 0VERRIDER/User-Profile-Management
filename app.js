const express = require('express');
const app = express();
const mongoose = require("mongoose");
const viewRoute = require('./api/routes/view');
const createRoute = require('./api/routes/create');
const mongoAtlasUri = 'mongodb+srv://anshil:fBj4ksZh3O1Bgqwj@cluster0.n9dcg.mongodb.net/user_db?retryWrites=true&w=majority';
//mongoose connect
try{
mongoose.connect(mongoAtlasUri,{
    useNewUrlParser: true ,
    useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);
}
catch(error){
    handleError(error);
}
//body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//cors fix
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin',"*");//allowed access to all client
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods','OPTIONS, PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
    
});
// main routes
app.use('/users/view', viewRoute);
app.use('/users/create', createRoute);




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