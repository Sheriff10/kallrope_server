const express = require("express");
const AdminAuth = require("../../middleware/adminAuth");
const {
   AssignedRoute,
   validateRouteQuery,
} = require("../../models/assignRoute");
const router = express.Router();

router.post("/", AdminAuth, async (req, res) => {
   try {
      const { error } = validateRouteQuery(req.body);
      if (error) res.status(400).send({ error: error.message });
      else {
         const assign_ID = (await AssignedRoute.count()) + 1;
         const assignRoute = new AssignedRoute({
            assign_ID,
            driver_ID: req.body.driver,
            pickup: req.body.pickup,
            destination: req.body.destination,
            passener: req.body.passener,
            time: req.body.time,
         });
         await assignRoute.save();
         res.status(200).send({ message: "Route Assigned" });
      }
   } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
      console.log(error);
   }
});

module.exports = router;
