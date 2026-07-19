import { Router } from "express";

import {
  getAllProducts,
  createProduct,
  getById,
  updateProduct,
  addProductImages,
  deleteProductImage,
  deleteProduct,
} from "../controllers/product.js";

import { upload } from "../middlewares/multer.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getById);

router.post("/", verifyAdmin, upload.array("images", 5), createProduct);

router.put("/:id", verifyAdmin, updateProduct);

router.post(
  "/:id/images",
  verifyAdmin,
  upload.array("images", 5),
  addProductImages,
);

router.delete("/:id/images", verifyAdmin, deleteProductImage);

router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
