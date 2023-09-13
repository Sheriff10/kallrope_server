const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const { Driver } = require("../../models/driver_model");

const router = express.Router();

router.get("/", AdminAuth, async (req, res) => {
   try {
      const driverCount = await Driver.count({});
      res.status(200).send({ total_drivers: driverCount });
   } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
      console.log(error);
   }
});

module.exports = router;
