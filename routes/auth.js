const express = require("express");
const router = express.Router();
require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const { body } = require("express-validator");
router.get("/getuser", isAuth, ()=>{authController.getUser} );

router.get("/login", 
() => {
  authController.getLogin;
});

router.get("/signup", () => {
  authController.getSignup;
});

router.post("/signup",
body("name", "enter a valid name").isLength({ min: 5 }),
body("email", "enter a valid email").isEmail(),
body("password", "password must be atleast 5 character").isLength({ min: 5 }), 
() => {
  authController.postSignup;
});

router.post("/login", 
body("email", "enter a valid email").isEmail(),
body("password", "password must be atleast 5 character").exists(),() => {
  authController.postLogin;
});

module.exports = router;
