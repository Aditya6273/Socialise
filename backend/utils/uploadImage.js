import cloudinary from "../config/cloudinary.js";
import path from "path";
export const uploadToCloudinary = async (file) => {
  try {
    const extname =
      path.extname(file.name) || "." + file.mimetype.split("/")[1];
    const fileName = `upload-${Date.now()}${extname}`;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: fileName,
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};
