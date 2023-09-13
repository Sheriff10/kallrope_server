const Joi = require("joi");
const mongoose = require("mongoose");

const PanicSchema = mongoose.Schema({
   message_id: { type: String },
   user_name: { type: String },
   subject: { type: String },
   message: { type: String },
   user_ID: { type: String },
   read: { type: String, default: false },
});

const Panic = mongoose.model("Panic", PanicSchema);

const validateEmmergencyQuery = (data) => {
   const schema = Joi.object({
      subject: Joi.string().required(),
      message: Joi.string().required(),
   });

   return schema.validate(data);
};

exports.Panic = Panic;
exports.validateEmmergencyQuery = validateEmmergencyQuery;
