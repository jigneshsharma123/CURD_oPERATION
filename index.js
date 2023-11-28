const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/',(req,res)=>{
     res.render('index')
})

app.listen(PORT, (ERR)=> {
    if(ERR) {
        console.log(ERR);
    }
    console.log('Server is running on port:',PORT);
})