const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const { Emergency } = require("../../models/emergency");

const router = express.Router();

router.get("/", AdminAuth, async (req, res) => {
   try {
      const emergencies = (await Emergency.find({})).reverse();
      res.status(200).send(emergencies);
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
