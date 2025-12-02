const express = require('express');
const mongoose = require('mongoose');
// const port =8080;
const PORT = process.env.PORT || 8080;

const app =express();
const path = require('path');
require('dotenv').config(); // loads variables from .env

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// ___________________________________________________________________
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

// ______________________________________________

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));




// _____________________________________________________
// uri="mongodb+srv://anshvardhandixit_db_user:sHqQiBaFI9DMQk2j@anshweb.g890rbp.mongodb.net/ANSHWEB?appName=ANSHWEB";
// --------------------------------------
// mongoose.connect(uri).then(()=>{
//     console.log("MONGODB IS CONNECTED");
// })
const Schema = mongoose.Schema;
dataschema =new Schema({
    NAME :String,
    email:String,
    message :String
});
const data= mongoose.model('data', dataschema);
// ______________________________________________________________________________
app.get('/', (req , res)=>{
    res.render("index");
})
app.post('/submit',(req ,res)=>{
    const{NAME , email, message}=req.body;
    const newdata = new data({
        NAME,
        email,
        message,
    });
    newdata.save();
    res.render("index", { msg: ` ${NAME} ` 
});


   
});
app.listen(PORT, ()=>{
    console.log("SERVER HAS STARTED.")
});