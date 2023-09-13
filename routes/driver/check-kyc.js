const express = require("express");
const DriverAuth = require("../../middleware/driverAuth");
const KYC = require("../../models/kyc-model");

const router = express.Router();

router.get("/", DriverAuth, async (req, res) => {
   try {
      const driverdata = req.driver;
      console.log(driverdata)
      const driverId = driverdata.driver_ID;
      const isVerified = (await KYC.find({ driver_ID: driverId }))[0].verified;

      if (isVerified == true) res.status(200).send({message: "KYCed"})
      else res.status(401).send({error: "not kyced"})
   } catch (error) {
      console.log(error);
   }
});

module.exports = router;
