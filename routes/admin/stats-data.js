const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const { Driver } = require("../../models/driver_model");

const router = express.Router();

router.get("/:type", AdminAuth, async (req, res) => {
   try {
      const type = req.params.type;
      if (type == "users") {
         // get users
      } else {
         const drivers = await (await Driver.find({})).reverse();
         res.status(200).send(drivers);
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
   }
});

module.exports = router;
