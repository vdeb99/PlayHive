import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadToCloudinary=async(file)=>{
    try{
        if(!file)
            return null
        const response=await cloudinary.uploader.upload(file.path,{
            resource_type:"auto"
        });
        console.log("File uploaded to cloudinary ",response.url)
        return response
    }
    catch(error){
        fs.linkSync(file)
        console.log(error)
    }
}
export default uploadToCloudinary;