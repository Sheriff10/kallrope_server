const Joi = require("joi");
const mongoose = require("mongoose");

const EmergencySchema = mongoose.Schema({
   message_id: { type: String },
   driver_name: { type: String },
   subject: { type: String },
   message: { type: String },
   driver_ID: { type: String },
   read: { type: String, default: false },
});

const Emergency = mongoose.model("Emergency", EmergencySchema);

const validateEmmergencyQuery = (data) => {
   const schema = Joi.object({
      subject: Joi.string().required(),
      message: Joi.string().required(),
   });

   return schema.validate(data);
};

exports.Emergency = Emergency;
exports.validateEmmergencyQuery = validateEmmergencyQuery;
