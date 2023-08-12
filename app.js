
const connecttomongo = require('./middleware/mongoose');

const express = require('express');
const passport = require('passport');


const session = require('express-session');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();


 app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

connecttomongo();



const passgoogle = require("./routes/passgoogle");
const passlinkedin = require("./routes/passlinkedin");
const passauth = require("./routes/auth");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'auth',
  keys: ['key1', 'key2']
}));


app.use(session({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());

app.use(passport.session());

app.use("/passgoogle",passgoogle);
app.use("/passlinkedin",passlinkedin);
app.use('/auth',passauth);




 



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});