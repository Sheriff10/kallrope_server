const jwt = require("jsonwebtoken");
const { Driver } = require("../models/driver_model");

const DriverAuth = async (req, res, next) => {
   const token = req.header("driver-auth-token");

   if (!token) return res.status(401).send("Access Denied!");
   else {
      try {
         const decode = jwt.verify(token, "kallrope");
         const email = decode.email
         const driver = await Driver.findOne({ email: email });
         req.driver = driver;
         
         next();
      } catch (error) {
         res.status(401).send("Invalid Token");
      }
   }
};

module.exports = DriverAuth;