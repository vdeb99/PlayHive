import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (filePath) => {
    try {
        if (!filePath || !fs.existsSync(filePath)) {
            throw new Error("File does not exist: " + filePath);
        }

        console.log("Uploading to Cloudinary:", filePath);

        const response = await cloudinary.uploader.upload(filePath, {
            folder:"PlayHive",
            resource_type: "auto"
        });

        console.log("File uploaded to Cloudinary:", response.url);

        
        fs.unlinkSync(filePath);

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        return null
    }
};


export default uploadToCloudinary;
