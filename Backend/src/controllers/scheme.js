import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { Scheme } from "../models/scheme.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const getAllSchemes = asyncHandler(async (req, res) => {
  const result = await Scheme.find();

  res
    .status(200)
    .json(new ApiResponse(200, result, "Schemes fetched successfully"));
});

const createScheme = asyncHandler(async (req, res) => {
  const { title, description, active } = req.body;

  const localFilePath = req.file?.path;

  if (!title) {
    throw new ApiError(400, "title is required");
  }
  if (!localFilePath) {
    throw new ApiError(400, "image is required");
  }

  const uploaded = await uploadOnCloudinary(localFilePath);

  if (!uploaded) {
    throw new ApiError(500, "Failed to upload image");
  }

  const created = await Scheme.create({
    title,
    description,
    active,
    image: {
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, created, "Scheme created successfully"));
});

const getById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const result = await Scheme.findById(id);

  if (!result) {
    throw new ApiError(404, "scheme not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "scheme found successfully"));
});

const updateScheme = asyncHandler(async (req, res) => {
  const { title, description, active } = req.body;

  const id = req.params.id;

  const result = await Scheme.findByIdAndUpdate(
    id,
    { title, description, active },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new ApiError(404, "scheme not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "scheme updated successfully"));
});

const deleteScheme = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const scheme = await Scheme.findById(id);

  if (!scheme) {
    throw new ApiError(404, "scheme not found");
  }

  const publicId = scheme.image.publicId;

  const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

  if (cloudinaryResult.result !== "ok") {
    throw new ApiError(500, "Failed to delete image from Cloudinary");
  }

  await Scheme.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse(200, {}, "scheme deleted successfully"));
});

export { getAllSchemes, createScheme, getById, updateScheme, deleteScheme };
