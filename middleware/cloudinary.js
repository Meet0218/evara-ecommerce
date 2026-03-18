// import {v2 as cloudinary} from 'cloudinary';
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloude = async (fileBuffer) => {
  return new Promise((resolve) => {
    if (!fileBuffer) {
      return resolve(null);
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return resolve(null);
        }
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};
