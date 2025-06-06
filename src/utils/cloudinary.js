import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()
    // Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// console.log(cloudinary.config())
    
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        // file has been successfully 
        console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporay file as the upload operation got failed
        return null;
    }
}

export default uploadOnCloudinary