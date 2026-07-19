import mongoose , { Schema} from "mongoose" 

const categorySchema = new Schema({

    name: {
        type: String,
        unique: true,
        required : true
    },
   icon: {
    type: String,
    required: true
    }

}, { timestamps: true })

export const Category = mongoose.model("Category" , categorySchema)