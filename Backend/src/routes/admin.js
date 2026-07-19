import { Router } from "express";
import { login, logout, checkAuth } from "../controllers/admin.js";
import { verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/login", login);

router.post("/logout", verifyAdmin, logout);

router.get("/me", verifyAdmin, checkAuth);

export default router;
