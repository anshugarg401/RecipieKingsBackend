const express = require("express");
const router = express.Router();
const{ getUser,postLogin,getSignup,postSignup,getLogin,postLogout} = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const {verifyUser } = require("../middleware/verifyUser");
const { body } = require("express-validator");
const User = require("../models/user");


router.get("/getuser", isAuth, getUser);

router.get("/confirm/:confirmationCode", verifyUser) // confirmation email needed to be validated at fronted as props

router.get("/login", 

 getLogin
);

router.get("/signup", 
   getSignup
);

router.post("/signup",
[
 
     body('email')
     .isEmail()
     .withMessage('Please enter a valid email.')
     .custom((value, { req }) => {
      
       return User.findOne({ email: value }).then(userDoc => {
         if (userDoc) {
           return Promise.reject(
             'E-Mail exists already, please pick a different one.'
           );
         }
       });
     })
     .normalizeEmail(),
   body(
     'password',
     'Please enter a password with only numbers and text and at least 5 characters.'
   )
     .isLength({ min: 5 })
     .isAlphanumeric()
     .trim(),
   body('confirmPassword')
     .trim()
     .custom((value, { req }) => {
       if (value !== req.body.password) {
         throw new Error('Passwords have to match!');
       }
       return true;
     })
 ],
  postSignup
);




router.post("/login", [
   body('email')
   .isEmail()
   .withMessage('Please enter a valid email address.')
   .normalizeEmail(),
   body('password', 'Password has to be valid.')
   .isLength({ min: 5 })
   .isAlphanumeric()
   .trim()],
   postLogin
);

router.post('/logout', postLogout);

module.exports = router;
