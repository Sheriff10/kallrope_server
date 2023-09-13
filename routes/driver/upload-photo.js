const express = require("express");
const uploadFile = require("../../functions/uploadHandler");
const DriverAuth = require("../../middleware/driverAuth");
const KYC = require("../../models/kyc-model");
const router = express.Router();

router.post("/:upload_type", DriverAuth, async (req, res) => {
   try {
      const uploadParam = req.params.upload_type;
      //    getting Image, uploading and getting the image url
      const imageName = "Image[]";
      const uploadedImage = req.files[imageName];
      const uploadImg = await uploadFile(uploadedImage);
      const ImageUrl = uploadImg.url;

      const okayResponse = res
         .status(200)
         .send({ mesage: "Image uploaded and stored" });

      switch (uploadParam) {
         case "photo":
            await KYC.updateOne(
               { driver_ID: req.driver.driver_ID },
               { $set: { driverPhoto: ImageUrl } }
            );
            return okayResponse;
         case "license":
            await KYC.updateOne(
               { driver_ID: req.driver.driver_ID },
               { $set: { driverLiscence: ImageUrl } }
            );
            return okayResponse;
         case "insurance":
            await KYC.updateOne(
               { driver_ID: req.driver.driver_ID },
               { $set: { vehicleIsurancePolicy: ImageUrl } }
            );
            return okayResponse;
         case "inspection":
            await KYC.updateOne(
               { driver_ID: req.driver.driver_ID },
               { $set: { vehicleInspectionReport: ImageUrl } }
            );
            return okayResponse;
         default:
            // return res.status(400).send({ error: "Invalid Parameter" });
      }
   } catch (error) {
      res.status(500).send({ error: "Internal Server Error " });
      console.log(error); 
   }
});

module.exports = router;
