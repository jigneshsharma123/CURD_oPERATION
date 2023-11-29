const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.URI;

mongoose.connect(uri, {
});

const db = mongoose.connection;

db.on('error',console.error.bind(console, 'error in connecting db'));
db.once('open',()=> {
    console.log("connected to the db");
});
module.exports = db;