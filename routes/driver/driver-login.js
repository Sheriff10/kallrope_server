const express = require("express");
const { Driver } = require("../../models/driver_model");
const bcrypt = require("bcrypt");
const { DriverToken } = require("../../functions/generateTokens");
const router = express.Router();

router.post("/", async (req, res) => {
   try {
      // we get the username and pasword
      const { email, password } = req.body;

      //    Check if email exists
      const findEmail = await Driver.find({ email });
      if (findEmail.length === 1) {
         // get hash passoword and verify
         const encryptedPassword = findEmail[0].password;
         const confirmPassword = await bcrypt.compare(
            password,
            encryptedPassword
         );

         if (confirmPassword) {
            const driverToken = DriverToken(email);
            res.header("driver-auth-token", driverToken);
            res.header("Access-Control-Expose-Headers", "driver-auth-token");
            res.status(200).send("Authenticated");
         } else {
            res.status(400).send({ error: "Invalid Credential" });
         }
      } else {
         res.status(400).send({ error: "Invalid Credential" });
      }
   } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
      console.log(error);
   }
});

module.exports = router;
