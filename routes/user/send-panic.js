const express = require("express");
const UserAuth = require("../../middleware/userAuth");
const { validateEmmergencyQuery } = require("../../models/emergency");
const { Panic } = require("../../models/panic");

const router = express.Router();

router.post("/", UserAuth, async (req, res) => {
   try {
      const { error } = validateEmmergencyQuery(req.body);
      if (error) res.status(400).send({ error: error.message });
      else {
         const { subject, message } = req.body;
         const user_ID = req.user.user_ID;
         const user_name = req.user.firstname;
         // Get message Count
         const message_id = (await Panic.count({})) + 1;
         const panic = new Panic({
            message_id,
            user_name,
            subject,
            message,
            user_ID,
         });
         await panic.save();
         res.status(200).send({ message: "Message Sent" });
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
   }
});

module.exports = router;
