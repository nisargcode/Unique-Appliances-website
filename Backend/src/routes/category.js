import { Router } from "express";
import  { getallcategory, createCategory } from "../controllers/category.js"
import {verifyAdmin} from "../middlewares/auth.js"

const router = Router()

router.get("/", getallcategory)

router.post("/" , verifyAdmin , createCategory)

export default router