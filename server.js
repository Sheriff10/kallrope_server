const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Driver Modules
const driver_signup = require("./routes/driver/new-drivers");
const driver_login = require("./routes/driver/driver-login");
const driver_uploadPhoto = require("./routes/driver/upload-photo");
const driver_kyc = require("./routes/driver/check-kyc");
const driver_emergency = require("./routes/driver/send-emergency");

// Admin Modules
const admin_login = require("./routes/admin/admin-login");
const admin_stats = require("./routes/admin/stats");
const admin_stats_data = require("./routes/admin/stats-data");
const admin_emergencies = require("./routes/admin/get-emergencies");
const admin_panics = require("./routes/admin/get-panics");
const admin_view_emergency = require("./routes/admin/view-emergency");
const admin_assign_route = require("./routes/admin/assign-route");
const admin_all_route = require("./routes/admin/all-assigned-route");

// User
const user_signup = require("./routes/user/user-registration");
const user_login = require("./routes/user/user-login");
const user_panic = require("./routes/user/send-panic");

mongoose
   .connect("mongodb+srv://ibrahimsheriff999:GESS7iN1MxLxU7ws@cluster0.qmlkd1x.mongodb.net/?retryWrites=true&w=majority")
   .then(() => console.log("Database Connected Successfully"))
   .catch((err) => console.log("Database Connection Error: " + err));

const app = express();
app.use(cors());
app.use(express.json());

app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
   })
);
// Admin api Route
app.use("/auth/admin/login", admin_login);
app.use("/admin/stats", admin_stats);
app.use("/admin/stats-data", admin_stats_data);
app.use("/admin/get-emergencies", admin_emergencies);
app.use("/admin/get-panics", admin_panics);
app.use("/admin/view-emergency", admin_view_emergency);
app.use("/admin/assign-route", admin_assign_route);
app.use("/admin/all-assigned-route", admin_all_route);

// Driver api routes
app.use("/auth/driver/new", driver_signup);
app.use("/auth/driver/login", driver_login);
app.use("/driver/kyc", driver_kyc);
app.use("/driver/send-emergency", driver_emergency);
app.use("/upload/driver", driver_uploadPhoto);

// Users
app.use("/auth/user/new", user_signup);
app.use("/auth/user/login", user_login);
app.use("/user/send-panic", user_panic);

app.get("/", (req, res) => {
   res.send("Kallrope Server at your service.");
});

app.listen(5000, () => {
   console.log("Listening on port 5000...");
});
