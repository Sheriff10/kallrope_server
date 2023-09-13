const jwt = require("jsonwebtoken");
const { Admin } = require("../models/admin_model");

const AdminAuth = async (req, res, next) => {
   const token = req.header("admin-auth-token");

   if (!token) return res.status(401).send("Access Denied!");
   else {
      try {
         const decode = jwt.verify(token, "admin-kallrope");
         const username = decode.username;
         const admin = await Admin.findOne({ username });
         req.admin = admin;

         next();
      } catch (error) {
         console.log(error)
         res.status(401).send("Invalid Token");
      }
   }
};

module.exports = AdminAuth;
