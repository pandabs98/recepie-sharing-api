import {asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler (async (req,res)=>{
    const {fullName, username, email, password} = req.body;
    // console.log("FullName",fullName)

    if(
        [fullName, username, email, password].some((field)=>field?.trim() === "")
    ){
        throw new ApiError (400, "All fields are required");
    }

    const userExists = await User.findOne({
        $or:[{username},
            {email}]
    })

    if(userExists){
        throw new ApiError(409,"Username of Email already exist")
    }
    
    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0]
    }

    if(!avatarLocalPath){
        throw new ApiError(500,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(500, "Avatar file is required")
    }

    const newUser = await User.create({
        fullName,
        username:username.toLowerCase(), 
        email:email.toLowerCase(), 
        password,
        avatar: avatar.url,
        coverImage:coverImage?.url || ""
    })

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500),"Something went wrong while registering the user"
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Register Successfully")
    )

})

export {
    registerUser,

}