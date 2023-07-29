const path = require('path');
const connecttomongo = require('./middleware/mongoose');
const express = require('express');
const passport = require('passport');
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const session = require('express-session')
app.set('view engine', 'ejs');
app.set('views', 'views');
connecttomongo();

const authRoutes = require('./routes/auth');




app.use(session({ 
  secret:process.env. SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true, 
 
  cookie: {
    
    httponly: true,
    maxAge: parseInt(process.env.MAXAGE)
} }));

app.use((req,res,next) => {
  console.log(req.session);
});
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.session());
app.use('/api/auth',authRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});