const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
   username: { type: String },
   password: { type: String },
});
const Admin = mongoose.model("Admin", AdminSchema);

exports.Admin = Admin