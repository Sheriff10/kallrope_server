const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const { AssignedRoute } = require("../../models/assignRoute");
const router = express.Router();

router.get("/", AdminAuth, async (req, res) => {
   try {
      const assignedRoutes = await AssignedRoute.find({});
      res.status(200).send({ assignedRoutes });
   } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
      console.log(error);
   }
});

module.exports = router;
