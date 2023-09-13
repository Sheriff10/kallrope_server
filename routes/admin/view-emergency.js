const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const { Emergency } = require("../../models/emergency");

const router = express.Router();

router.get("/:id", AdminAuth, async (req, res) => {
   try {
      const message_id = req.params.id;
      const viewEmergency = await Emergency.find({ message_id });
      res.status(200).send(viewEmergency);
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
