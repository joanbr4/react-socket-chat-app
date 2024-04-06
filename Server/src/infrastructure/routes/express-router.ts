import "dotenv/config"
import express from "express"
import * as userController from "../controllers/user.controller"
import { auth } from "../middlware/auth"

const router = express.Router()

router.post("/login", userController.loginOne)

router.post("/logout", userController.logoutOne)

router.post("/register", userController.registerOne)

router.get("/chat/:owner/:with", auth, userController.chatOne)
router.post("/chat/:owner/:with", userController.createChatOne)

router.get("/search/:query", userController.searchOne)

router.post("/rooms/:room", userController.addRoomOne)

// router.get("/sessions/oauth/google", userController.cloudOne)

router.post("/auth/google", userController.authGoogle)

export default router
