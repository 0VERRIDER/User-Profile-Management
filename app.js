const express = require('express');
const app = express();

app.use((req,res,next)=>{
res.statusCode(200).json({
    message : "test server"
});
});

module.exports = app;