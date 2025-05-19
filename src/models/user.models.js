import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        lowecase:true,
        unique:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password,10)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.isPasswordCorrect = async function (password){
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log("password is incorrect")
    }
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            fullName:this.fullName,
            username:this.username,
            email:this.email,
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)