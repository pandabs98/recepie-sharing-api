import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const recipeSchema = new mongoose.Schema({
    
    image:{
        type:String,
        required:true
    },
    recipeName:{
        type:String,
        requied:true
    },
    ingredients:{
        type:String,
        required:true
    },
    cookingTime:{
        type:String,
        required:true
    },
    cookingProcess:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
    
},{timestamps:true})

recipeSchema.plugin(mongooseAggregatePaginate)

export const Recepie = mongoose.model("Recipe", recipeSchema)