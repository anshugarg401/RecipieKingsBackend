
var jwt = require("jsonwebtoken");


const isAuth = (req,res,next)=>{
    let success = false;

    const token = req.headers["auth-token"];
    if(!token){
        res.status(401).json({error:"please authenticate using a valid token"});    
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        res.json({success: true,message:"successfull authentication"});
        next();
    } catch (error) {
        res.status(401).json({success,error:"please authenticate using a valid token"});
    }
   

}
module.exports = isAuth;




















// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

// function initialize(passport, getUserByEmail, getUserById) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email)
//     if (user == null) {
//       return done(null, false, { message: 'No user with that email' })
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'Password incorrect' })
//       }
//     } catch (e) {
//       return done(e)
//     }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id))
//   })
// }

 
//   module.exports = initialize;