import "dotenv/config"
import express, { NextFunction } from "express"
import * as userController from "../controllers/user.controller"
import { auth } from "../middlware/auth"
import { OAuth2Client, UserRefreshClient } from "google-auth-library"

// console.log(process.env.GOOGLE_CLIENT_ID)
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
)

const router = express.Router()

router.post("/login", userController.loginOne)

router.post("/logout", userController.logoutOne)

router.post("/register", userController.registerOne)

router.get("/chat/:owner/:with", auth, userController.chatOne)
router.post("/chat/:owner/:with", userController.createChatOne)

router.get("/search/:query", userController.searchOne)

router.post("/rooms/:room", userController.addRoomOne)

// router.get("/sessions/oauth/google", userController.cloudOne)

router.post("/auth/google", async (req, res) => {
  const code = req.body.code
  console.log("bodyyy", code)
  const tokens = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "postmessage",
      grant_type: "authorization_code",
    }),
  })
  const response = await tokens.json()
  console.log("tok", response)
  if (code) {
    const { tokens } = await oAuth2Client.getToken(code) // exchange code for tokens
    console.log("tokens!!", tokens)
    res.json(tokens)
  }
})

// router.post("/auth/google/refresh-token", async (req, res) => {
//   const user = new UserRefreshClient(
//     clientId,
//     clientSecret,
//     req.body.refreshToken
//   )
//   const { credentials } = await user.refreshAccessToken() // optain new tokens
//   res.json(credentials)
// })
export default router
