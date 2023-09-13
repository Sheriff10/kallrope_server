const jwt = require("jsonwebtoken");
const { User } = require("../models/users_model");

const UserAuth = async (req, res, next) => {
   const token = req.header("user-auth-token");

   if (!token) return res.status(401).send("Access Denied!");
   else {
      try {
         const decode = jwt.verify(token, "user-kallrope");
         const email = decode.email
         const user = await User.findOne({ email: email });
         req.user = user;
         
         next();
      } catch (error) {
         res.status(401).send("Invalid Token");
      }
   }
};

module.exports = UserAuth;