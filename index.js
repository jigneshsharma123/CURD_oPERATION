const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db = require('./config/db');
const user = require('./models/user');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', async(req,res)=>{
     
    try {
        
        const userData = await user.find({});
        console.log(userData);
        res.status(200).render('index',{userData});


    } catch (error) {
        res.status(500).send(error.message);
    }
    

});
app.post('/user_data',async(req,res)=> {
   const{firstName, lastName,mobile,email,password} = req.body;
       try {
       const newData = new user({firstName, lastName,mobile,email,password})
       console.log(newData);
       await newData.save();
       res.status(201).redirect('/');
    } catch (error) {
     res.status(500).send(error.message);
   }
});
app.get('/delete_user/:id',async(req,res)=> {
    const userId = req.params.id;
    try {
      await user.findByIdAndDelete(userId);
      res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/edit_user/:id', async(req,res) => {
     const userId = req.params.id;
    try {
    const  User = await user.findById(userId);
    res.render('edit',{User}); 
    
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post('/update_user/:id', async(req,res)=>{
      const UserId = req.params.id;
      
    try {
     await user.findByIdAndUpdate(UserId,req.body)
    res.status(201).redirect('/');
        
    } catch (error) {
    res.status(500).send(error.message);
        
    }
});
app.listen(PORT, (ERR)=> {
    if(ERR) {
        console.log(ERR);
    }
    console.log('Server is running on port:',PORT);
})