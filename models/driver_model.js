const Joi = require("joi");
const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
   driver_ID: { type: String },
   firstname: { type: String },
   lasname: { type: String },
   email: { type: String },
   phone: { type: String },
   address: { type: String },
   password: { type: String },
});

const Driver = mongoose.model("Drivers", DriverSchema);

const validateDriverQuery = (data) => {
   const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      password: Joi.string().required(),
   });
   return schema.validate(data);
};

exports.Driver = Driver;
exports.validateDriverQuery = validateDriverQuery;
