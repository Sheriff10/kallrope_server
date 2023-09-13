const express = require("express");
const { Driver } = require("../../models/driver_model");
const bcrypt = require("bcrypt");
const { DriverToken, AdminToken } = require("../../functions/generateTokens");
const { Admin } = require("../../models/admin_model");
const router = express.Router();

router.post("/", async (req, res) => {
   try {
      // we get the username and pasword
      const { username, password } = req.body;
      //    Check if email exists
      const findUsername = await Admin.find({ username });
      if (findUsername.length === 1) {
         // get hash passoword and verify
         const encryptedPassword = findUsername[0].password;
         const confirmPassword = await bcrypt.compare(
            password,
            encryptedPassword
         );

         if (confirmPassword) {
            const adminToken = AdminToken(username);
            res.header("admin-auth-token", adminToken);
            res.header("Access-Control-Expose-Headers", "admin-auth-token");
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
