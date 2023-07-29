const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://findonicdev:3h5JspxG8JWgaO6i@cluster0.oexbwmg.mongodb.net/"
const connecttomongo = ()=>{mongoose.connect(mongoURL).then(console.log("connected to db")).catch(err => {
    console.log(err);
  });} 
module.exports = connecttomongo;
