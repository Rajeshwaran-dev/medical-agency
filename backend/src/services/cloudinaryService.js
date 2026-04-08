const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadImageBuffer = (fileBuffer, folder = "medical-agency/products") =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });

module.exports = { uploadImageBuffer };
