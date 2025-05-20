import mongoose from "mongoose"

const commentSchema = mongoose.Schema({

    content: {
            type: String,
            required: true
        },
    owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
}, {timestamps:true})

const Comments = mongoose.model("Comments", commentSchema)