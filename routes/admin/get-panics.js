const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const { Panic } = require("../../models/panic");

const router = express.Router();

router.get("/", AdminAuth, async (req, res) => {
   try {
      const panics = (await Panic.find({})).reverse();
      res.status(200).send(panics);
   } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
