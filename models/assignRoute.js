const Joi = require("joi");
const mongoose = require("mongoose");

const AssignRouteSchema = mongoose.Schema({
   assign_ID: { type: String },
   driver_ID: { type: String },
   pickup: { type: String },
   destination: { type: String },
   passenger: { type: String },
   time: { type: String },
   completed: { type: String, default: false },
});

const AssignedRoute = mongoose.model("AssignRoute", AssignRouteSchema);

const validateRouteQuery = (data) => {
   const schema = Joi.object({
      driver: Joi.string().required(),
      pickup: Joi.string().required(),
      destination: Joi.string().required(),
      passenger: Joi.string().required(),
      time: Joi.string().required(),
   });

   return schema.validate(data);
};

exports.AssignedRoute = AssignedRoute;
exports.validateRouteQuery = validateRouteQuery;
