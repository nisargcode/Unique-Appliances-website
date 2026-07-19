import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { Snapshot } from "../models/snapshot.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const getAllSnapshots = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const filter = category ? { category } : {};

  const result = await Snapshot.find(filter);

  res.status(200).json(new ApiResponse(200, result, "snapshots found successfully"));
});

const createSnapshot = asyncHandler(async (req, res) => {
  const { category, description } = req.body;

  if (!category) {
    throw new ApiError(400, "category is required");
  }

  const localFilePath = req.file?.path;

  if (!localFilePath) {
    throw new ApiError(400, "image is required");
  }

  let snapshot;

  if (localFilePath) {
    snapshot = await uploadOnCloudinary(localFilePath);
    }
    
    if (!snapshot) {
  throw new ApiError(500, "Failed to upload image");
}

  const result = await Snapshot.create({
  category,
  description,
  image: {
    url: snapshot.secure_url,
    publicId: snapshot.public_id,
  },
});
  res
    .status(201)
    .json(new ApiResponse(201, result, "snapshot created Successfully"));
});

const getById = asyncHandler(async (req, res) => {

  const id = req.params.id;

  const result = await Snapshot.findById(id);

  if (!result) {
    throw new ApiError(404, "snapshot not found");
    }
    
  res
    .status(200)
    .json(new ApiResponse(200, result, "snapshot found successfully"));
});

const updateSnapshot = asyncHandler(async (req, res) => {

  const { category, description } = req.body;

  const id = req.params.id;

  const result = await Snapshot.findByIdAndUpdate(
    id,
    { category, description },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new ApiError(404, "snapshot not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "snapshot updated successfully"));
});


const deleteSnapshot = asyncHandler(async (req, res) => {
    
  const { id } = req.params;

   const snapshot = await Snapshot.findById(id);

  if (!snapshot) {
    throw new ApiError(404, "snapshot not found");
  }

  const publicId = snapshot.image.publicId;

  const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

  if (cloudinaryResult.result !== "ok") {
    throw new ApiError(500, "Failed to delete image from Cloudinary");
  }

  await Snapshot.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Snapshot deleted successfully"));
});


export {
  getAllSnapshots,
  createSnapshot,
  getById,
  updateSnapshot,
  deleteSnapshot,
};
