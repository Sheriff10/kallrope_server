const cloudinary = require("cloudinary").v2;
const uploadFile = async (file) => {
   try {
      cloudinary.config({
         cloud_name: "dlnrppbjh",
         api_key: "687479592395473",
         api_secret: "LM5UY0DO8EGrLuGyQOOMeaGCNOY",
      });

      const res = await cloudinary.uploader.upload(file.tempFilePath, {
         public_id: file.name,
      });
      return res;
   } catch (error) {
      console.log(error);
   }
};
module.exports = uploadFile;
