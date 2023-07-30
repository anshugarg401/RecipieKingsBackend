
const connecttomongo = require('./middleware/mongoose');
// const passportInitialize = require("./controllers/passport") 



const express = require('express');
const passport = require('passport');
require('./controllers/passport');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();


app.set('views', './views');
app.set('view engine', 'ejs');

connecttomongo();


const authRoutes = require('./routes/auth');
const passauth = require("./routes/passport");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/auth',authRoutes);

app.use(cookieSession({
  name: 'auth',
  keys: ['key1', 'key2']
}));


app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());

app.use(passport.session());

app.use("/passport",passauth);

 



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});