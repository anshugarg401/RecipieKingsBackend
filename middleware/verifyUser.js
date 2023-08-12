const User = require("../models/user");

const verifyUser = (req, res, next) => {
  User.findOne({
      confirmationCode: req.params.confirmationCode,
    }
   )
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." }).redirect("auth/signup");
        }
  
        user.status = "Active";
        console.log("verifing user"+user);
        user.save()
      }).then(
        (err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          }
      )
      .catch((e) => console.log("error", e));
  };
  module.exports = {verifyUser};