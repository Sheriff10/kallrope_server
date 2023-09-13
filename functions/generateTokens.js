const jwt = require("jsonwebtoken");

const UserToken = (data) => {
   const userToken = jwt.sign({email: data}, "user-kallrope", { expiresIn: "900s" });
   return userToken;
};

const DriverToken = (data) => {
   const driverToken = jwt.sign({email: data}, "kallrope", { expiresIn: "900s" });
   return driverToken;
};
const AdminToken = (data) => {
    const driverToken = jwt.sign({username: data}, "admin-kallrope", { expiresIn: "900s" });
    return driverToken;
 };

exports.UserToken = UserToken;
exports.DriverToken = DriverToken;
exports.AdminToken = AdminToken
