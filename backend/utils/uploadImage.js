import cloudinary from "../config/cloudinary.js";
import path from "path"
export const uploadToCloudinary = async (file) => {
    try {
      // Extract file extension and assign it if missing
      const extname = path.extname(file.name) || '.' + file.mimetype.split('/')[1];
      const fileName = `upload-${Date.now()}${extname}`;
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: fileName,  
        resource_type: 'auto', 
      });
  
      return result.secure_url; // Return the uploaded file URL
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return null;
    }
  };