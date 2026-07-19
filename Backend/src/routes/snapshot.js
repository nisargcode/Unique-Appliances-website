import { Router } from "express";

import {
  getAllSnapshots,
  createSnapshot,
  getById,
  updateSnapshot,
  deleteSnapshot,
} from "../controllers/snapshot.js";

import { upload } from "../middlewares/multer.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.get("/", getAllSnapshots);

router.get("/:id", getById);

router.post("/", verifyAdmin, upload.single("image"), createSnapshot);

router.put("/:id", verifyAdmin, updateSnapshot);

router.delete("/:id", verifyAdmin, deleteSnapshot);

export default router;
