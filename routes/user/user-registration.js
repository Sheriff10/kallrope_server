const express = require("express");
const generateDriverId = require("../../functions/driverId");
const { validateDriverQuery, Driver } = require("../../models/driver_model");
const bcrypt = require("bcrypt");
const KYC = require("../../models/kyc-model");
const { User, validateUserQuery } = require("../../models/users_model");

const route = express.Router();

route.post("/", async (req, res) => {
   const { error } = validateUserQuery(req.body);
   if (error) res.status(400).send({ err: error.message });
   else {
      try {
         //  Find is email exists
         const findEmail = await User.count({ email: req.body.email });
         if (findEmail > 0) res.status(400).send({ err: "Email exists" });
         else {
            // get generated id
            const userCount = await User.count({});
            const ID = generateDriverId(userCount);

            // Encrypt Password
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            // Create new driver
            const driver = new User({
               user_ID: ID,
               firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               phone: req.body.phone,
               address: req.body.address,
               password: encryptedPassword,
            });
            await driver.save();

            //  Create Driver KYC
            // const kyc = new KYC({
            //    driver_ID: ID,
            // });
            // await kyc.save();
            res.status(200).send({ message: "User Registered Successfully" });
         }
      } catch (error) {
         console.log(error);
         if (error) res.status(500).send({ error: "Internal Server Error" });
      }
   }
});

module.exports = route;
