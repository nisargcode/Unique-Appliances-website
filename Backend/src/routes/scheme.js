import { Router } from "express";
import { getAllSchemes, createScheme, getById, updateScheme, deleteScheme } from "../controllers/scheme.js";
import { upload } from "../middlewares/multer.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllSchemes);

router.post("/", verifyAdmin, upload.single("image"), createScheme);

router.get("/:id", getById);

router.put("/:id", verifyAdmin, updateScheme);

router.delete("/:id", verifyAdmin, deleteScheme);

export default router;
