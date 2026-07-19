import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import mongoose from "mongoose"
import {Category} from "../models/category.js"

const getallcategory = asyncHandler(async (req, res) => {
    
    const categories = await Category.find()

    res.status(200).json(
        new ApiResponse(200, 
            categories, 
            "categories found Successfully"
        )
    )
})

const createCategory = asyncHandler(async (req, res) => {
    
    const { name, icon } = req.body

    if (!name) {
        throw new ApiError(400 , "name is required")
    }
    if (!icon) {
        throw new ApiError(400 , "icon is required")
    }
    const created = await Category.create({ name, icon })
    
    res.status(201).json(
    new ApiResponse(201, created, "categories created Successfully")
)
})

export { getallcategory, createCategory }

