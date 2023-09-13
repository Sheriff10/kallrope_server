const express = require("express");
const DriverAuth = require("../../middleware/driverAuth");
const {
   Emergency,
   validateEmmergencyQuery,
} = require("../../models/emergency");

const router = express.Router();

router.post("/", DriverAuth, async (req, res) => {
   try {
      const { error } = validateEmmergencyQuery(req.body);
      if (error) res.status(400).send({ error: error.message });
      else {
         const { subject, message } = req.body;
         const driver_ID = req.driver.driver_ID;
         const driver_name = req.driver.firstname;
         // Get message Count
         const message_id = (await Emergency.count({})) + 1;
         const emergency = new Emergency({
            message_id,
            driver_name,
            subject,
            message,
            driver_ID,
         });
         await emergency.save();
         res.status(200).send({ message: "Messgae Sent" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
   }
});

module.exports = router;
