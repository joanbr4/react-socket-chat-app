import express, { NextFunction } from "express"
import * as userController from "../controllers/user.controller"
import { auth } from "../middlware/auth"

const router = express.Router()

router.post("/login", userController.loginOne)

router.post("/register", userController.registerOne)

router.get("/user/data", auth, (req, res) => {})

export default router
