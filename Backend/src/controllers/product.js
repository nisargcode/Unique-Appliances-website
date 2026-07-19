import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const filter = category ? { category } : {};

  const result = await Product.find(filter);

  res
    .status(200)
    .json(new ApiResponse(200, result, "product got successfully"));
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, category, brand, description, rating, badge } = req.body;

  if (!name) {
    throw new ApiError(400, "name is required");
  }
  if (!category) {
    throw new ApiError(400, "category is required");
  }
  if (!brand) {
    throw new ApiError(400, "brand is required");
  }

  const uploadResults = await Promise.all(
    (req.files || []).map((file) => uploadOnCloudinary(file.path)),
  );

  const images = uploadResults
    .filter((result) => result !== null)
    .map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));

  const product = await Product.create({
    name,
    category,
    brand,
    description,
    images,
    badge,
    rating,
  });

  res
    .status(201)
    .json(new ApiResponse(201, product, "product created Successfully"));
});

const getById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const result = await Product.findById(id);

  if (!result) {
    throw new ApiError(404, "product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "product found successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, brand, description, rating, badge } = req.body;

  const id = req.params.id;

  const result = await Product.findByIdAndUpdate(
    id,
    { name, category, brand, description, rating, badge },
    { new: true, runValidators: true },
  );

  if (!result) {
    throw new ApiError(404, "product not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "product updated successfully"));
});

const addProductImages = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const existingImages = product.images.length;
  const newImages = req.files?.length || 0;

  if (existingImages + newImages > 5) {
    throw new ApiError(400, "A product can have at most 5 images");
  }

  const uploadedImages = await Promise.all(
    (req.files || []).map(async (file) => {
      const uploaded = await uploadOnCloudinary(file.path);

      if (!uploaded) return null;

      return {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      };
    }),
  );

  const validImages = uploadedImages.filter(Boolean);

  product.images.push(...validImages);

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Images added successfully"));
});

const deleteProductImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { publicId } = req.body;

  if (!publicId) {
    throw new ApiError(400, "publicId is required");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const image = product.images.find((img) => img.publicId === publicId);

  if (!image) {
    throw new ApiError(404, "Image not found in this product");
  }

  const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

  if (cloudinaryResult.result !== "ok") {
    throw new ApiError(500, "Failed to delete image from Cloudinary");
  }

  product.images = product.images.filter((img) => img.publicId !== publicId);

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Image deleted successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await Promise.all(
    product.images.map(async (img) => {
      try {
        await cloudinary.uploader.destroy(img.publicId);
      } catch (err) {
        console.log(
          "Failed to delete image from Cloudinary:",
          img.publicId,
          err,
        );
      }
    }),
  );

  await Product.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
  getAllProducts,
  createProduct,
  getById,
  updateProduct,
  addProductImages,
  deleteProductImage,
  deleteProduct,
};
